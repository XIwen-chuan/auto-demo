<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<template>
  <div class="_graph-table-static">
    <div class="nodes">
      <el-input
        class="filter-search"
        v-model="state.nodeSearch"
        size="small"
        placeholder="Type to search"
      />
      <el-table :data="filterNodes" style="width: 100%" :border="true">
        <el-table-column type="expand" resizable>
          <template #default="scope">
            <div m="4" class="attr_table">
              <h2>{{ scope.row.instruction }}</h2>
              <!-- <el-button @click="showModifyInstructionDialog(scope)"
                >Edit instruction word</el-button
              > -->
              <h3>Related edges</h3>
              <el-table :data="scope.row.relatedEdges">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="Source node" prop="source.text" />
                <el-table-column label="Target node" prop="target.text" />
              </el-table>
              <h3>Slots</h3>
              <!-- <el-button
                @click="showAddattrDialog(models.AttributeM.slot, scope)"
              >
                Add
              </el-button> -->
              <el-table :data="scope.row.slots">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="Argument Name" prop="key" />
                <el-table-column label="Argument Value" prop="value" />
                <!-- <el-table-column label="">
                  <template #default="scope">
                    <el-button @click="deleteAttr(scope)"> delete </el-button>
                  </template>
                </el-table-column> -->
              </el-table>
              <h3>Emits</h3>
              <!-- <el-button
                @click="showAddattrDialog(models.AttributeM.emit, scope)"
              >
                Add
              </el-button> -->
              <el-table :data="scope.row.emits">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="Key" prop="key" />
                <el-table-column label="Value" prop="value" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Text" prop="text" sortable resizable />
        <el-table-column
          label="Instruction"
          prop="instruction"
          width="110px"
          sortable
        />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  ref,
  reactive,
  nextTick,
  onMounted,
  defineEmits,
  computed,
} from "vue";
import * as models from "@/models";
import * as api from "@/api";
import { ElMessageBox } from "element-plus";
import { useProtocolStore } from "@/store";

const protocolStore = useProtocolStore();

const state = reactive({
  modifyInstructionDialogVisible: false,
  modifyInstructionWord: "",
  modifyInstructionScope: {},
  addEdgeFormVisible: false,
  addAtrrDialogVisible: false,
  addingAtrrType: models.AttributeM.slot,
  addingAttrScope: {},
  nodeSearch: "",
  edgeSearch: "",
  instructionFiltered: [] as any[],
  formInline: {
    source: "",
    target: "",
    text: "",
  },
  formInDialog: {
    key: "",
    value: "",
  },
  humanModifiedIsa: {},
});

const filterIntructions = (query: string) => {
  try {
    if (query) {
      console.log(
        "Object.keys(state.humanModifiedIsa)",
        Object.keys(state.humanModifiedIsa)
      );
      state.instructionFiltered = Object.keys(state.humanModifiedIsa).filter(
        (item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        }
      );
    } else {
      state.instructionFiltered = [];
    }
  } catch (error) {
    state.instructionFiltered = [];
  }
};

const filterAttrs = computed(() => {
  try {
    return Object.keys(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.humanModifiedIsa[state.addingAttrScope.row.instruction][
        state.addingAtrrType
      ]
    );
  } catch (error) {
    return [];
  }
});

const filterSlotsCandidates = computed(() => {
  // 找到指向该 node 的所有 node，将它们的 emits 列出来以作为该 node 的 slots 的 value 的候选项
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  console.log("state.addingAttrScope.row", state.addingAttrScope.row);
  const nodes = [] as models.Node[];
  const edges = props.graph.edges.filter(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (edge) => edge.target.node_id === state.addingAttrScope.row.id
  );
  console.log("candidates edges", edges);
  edges.forEach((edge) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const node = props.graph.nodes.find(
      (node) => node.id === edge.source.node_id
    );
    if (node) {
      nodes.push(node);
    }
  });
  if (nodes.length === 0) {
    return [];
  }
  console.log("candidates nodes", nodes);
  // 提取所有 nodes 的 emits 组合到一个数组中，每个元素是一个 EmitM 类型
  const candidates: models.Emit[] = [];
  nodes.forEach((node) => {
    node.emits.forEach((emit) => {
      candidates.push(emit);
    });
  });
  console.log("candidates", candidates);
  return candidates;
});

const filterNodes = computed(() =>
  props.graph.nodes
    ? props.graph.nodes.filter(
        (data) =>
          !state.nodeSearch ||
          data.text.toLowerCase().includes(state.nodeSearch.toLowerCase()) ||
          data.instruction
            .toLowerCase()
            .includes(state.nodeSearch.toLowerCase()) ||
          data.id.toLowerCase().includes(state.nodeSearch.toLowerCase())
      )
    : []
);

const filterEdges = computed(() =>
  props.graph.edges
    ? props.graph.edges.filter(
        (data) =>
          !state.edgeSearch ||
          data.text.toLowerCase().includes(state.edgeSearch.toLowerCase()) ||
          data.source.attr_id
            .toLowerCase()
            .includes(state.edgeSearch.toLowerCase()) ||
          data.target.attr_id
            .toLowerCase()
            .includes(state.edgeSearch.toLowerCase()) ||
          data.source.node_id
            .toLowerCase()
            .includes(state.edgeSearch.toLowerCase()) ||
          data.target.node_id
            .toLowerCase()
            .includes(state.edgeSearch.toLowerCase())
      )
    : []
);

const searchNodeIdByAttrId = (attrId: string) => {
  const node = props.graph.nodes.find((node) => {
    return (
      node.slots.find((slot) => slot.id === attrId) ||
      node.emits.find((emit) => emit.id === attrId)
    );
  });
  return node?.id;
};

const props = defineProps<{ graph: models.GraphM; filename: string }>();
// 基于类型
const emits = defineEmits<{
  (
    e: "add-attr",
    nodeId: string,
    attrId: string,
    attrType: models.AttributeM,
    key: string,
    value: string
  ): void;
  (e: "delete-attr", attrId: string): void;
  (
    e: "add-edge",
    edgeId: string,
    source: models.Source,
    target: models.Target,
    text: string
  ): void;
  (e: "delete-edge", edgeId: string): void;
  (e: "modify-instruction", nodeId: string, newInstruction: string): void;
}>();

// 1. 修改指令字
// 2. 添加 Slot/Emit
// 3. 删除 Slot/Emit，同时删除连接
// 4. 建立连接
// 5. 检索（表格内）

const showAddattrDialog = (attrType: models.AttributeM, scope: any) => {
  state.addingAttrScope = scope;
  state.addingAtrrType = attrType;
  state.formInDialog.key = "";
  state.formInDialog.value = "";
  state.addAtrrDialogVisible = true;
};

const showModifyInstructionDialog = (scope: any) => {
  console.log("showModifyInstructionDialog", scope);
  state.modifyInstructionDialogVisible = true;
  state.modifyInstructionScope = scope;
  state.modifyInstructionWord = scope.row.instruction;
};

const modifyInstructionWord = async () => {
  const modifyInstructionScope = state.modifyInstructionScope as {
    row: { id: string };
  };
  await api.reqModifyInstruction(
    props.filename,
    modifyInstructionScope.row.id,
    state.modifyInstructionWord
  );
  emits(
    "modify-instruction",
    modifyInstructionScope.row.id,
    state.modifyInstructionWord
  );
  state.modifyInstructionDialogVisible = false;
};

const deleteAttr = async (scope: any) => {
  const nodeId = searchNodeIdByAttrId(scope.row.id) as string;
  await api.reqDeleteAttr(props.filename, nodeId, scope.row.id);
  emits("delete-attr", scope.row.id);
  console.log("deleteAttr", scope);
};

const addAttr = async (
  isAuto: boolean,
  candidateNodeId: string,
  key: string,
  value: string,
  candidateId: string
) => {
  const addingAttrScope = state.addingAttrScope as { row: { id: string } };
  const nodeId = searchNodeIdByAttrId(addingAttrScope.row.id) as string;
  if (isAuto) {
    const newAttrId = await api.reqAddAttr(
      props.filename,
      addingAttrScope.row.id,
      key,
      value,
      state.addingAtrrType
    );
    emits(
      "add-attr",
      addingAttrScope.row.id,
      newAttrId,
      state.addingAtrrType,
      key,
      value
    );

    // 然后添加 edge
    const sourceNodeId = searchNodeIdByAttrId(candidateId);
    const sourceText = props.graph.nodes.find(
      (node) => node.id === sourceNodeId
    )?.text;
    const targetNodeId = addingAttrScope.row.id;
    const targetText = props.graph.nodes.find(
      (node) => node.id === targetNodeId
    )?.text;

    const source: models.Source = {
      text: sourceText,
      node_id: sourceNodeId as string,
      attr_id: candidateId,
    };
    const target: models.Target = {
      text: targetText,
      node_id: targetNodeId,
      attr_id: newAttrId,
    };
    const newEdgeId = await api.reqAddEdge(
      props.filename,
      source,
      target,
      state.formInline.text
    );
    emits("add-edge", newEdgeId, source, target, state.formInline.text);
  } else {
    const newAttrId = await api.reqAddAttr(
      props.filename,
      nodeId,
      state.formInDialog.key,
      state.formInDialog.value,
      state.addingAtrrType
    );
    emits(
      "add-attr",
      nodeId,
      newAttrId,
      state.addingAtrrType,
      state.formInDialog.key,
      state.formInDialog.value
    );
  }

  console.log("addAttr");
  state.addAtrrDialogVisible = false;
  state.formInDialog.key = "";
  state.formInDialog.value = "";
};

const addEdge = async () => {
  const sourceNodeId = searchNodeIdByAttrId(state.formInline.source);
  const sourceText = props.graph.nodes.find(
    (node) => node.id === sourceNodeId
  )?.text;
  const targetNodeId = searchNodeIdByAttrId(state.formInline.target);
  const targetText = props.graph.nodes.find(
    (node) => node.id === targetNodeId
  )?.text;
  if (!sourceNodeId || !targetNodeId) {
    ElMessageBox.alert("Source or target not found");
    return;
  }
  const source: models.Source = {
    text: sourceText,
    node_id: sourceNodeId,
    attr_id: state.formInline.source,
  };
  const target: models.Target = {
    text: targetText,
    node_id: targetNodeId,
    attr_id: state.formInline.target,
  };
  const newEdgeId = await api.reqAddEdge(
    props.filename,
    source,
    target,
    state.formInline.text
  );
  emits("add-edge", newEdgeId, source, target, state.formInline.text);
  state.formInline.source = "";
  state.formInline.target = "";
  state.formInline.text = "";
  state.addEdgeFormVisible = false;
  console.log("Add edge");
  await nextTick();
};

const deleteEdge = async (scope: any) => {
  await api.reqDeleteEdge(props.filename, scope.row.id);
  emits("delete-edge", scope.row.id);
};

const dialogVisible = ref(false);

onMounted(async () => {
  await api.reqGetHumanModifiedIsaJson();
  console.log("props", props);
  console.log("props.graph", props.graph);
  state.humanModifiedIsa = protocolStore.getHumanModifiedIsa();
});
</script>

<style lang="scss">
._graph-table-static {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: stretch;
  font-size: 8px;
  .el-table {
    font-size: 8px;
  }
  .nodes {
    flex: 1;
    .filter-search {
      margin: 10px;
    }
    .attr_table {
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #ccc;
    }
  }
  .el-divider--vertical {
    height: auto;
    margin: 0 16px;
  }
  .edges {
    flex: 1;
    .filter-search {
      margin: 10px;
    }
    .attr_table {
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #ccc;
    }
  }
  .dialogs {
    .add-atrr-dialog {
      width: auto;
      min-width: 400px;
      .el-dialog__body {
        display: flex;
        justify-content: center;
        align-items: center;
        .candidates {
          margin-right: 40px;
          .candidate {
            box-sizing: border-box;
            padding: 10px;
            border: 0.5px solid #ccc;
            .candidate-param {
              font-weight: 600;
            }
          }
        }
        .middle {
          margin: 50px;
        }
        .demo-form-inline {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
