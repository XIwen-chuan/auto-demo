<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<template>
  <div class="_graph-table">
    <div class="nodes">
      <el-input
        class="filter-search"
        v-model="state.nodeSearch"
        size="small"
        placeholder="Type to search"
      />
      <el-table :data="filterNodes" style="width: 100%">
        <el-table-column type="expand">
          <template #default="scope">
            <div m="4" class="attr_table">
              <h2>{{ scope.row.instruction }}</h2>
              <el-button @click="showModifyInstructionDialog(scope)"
                >Edit instruction word</el-button
              >
              <h3>Slots</h3>
              <el-button
                @click="showAddattrDialog(models.AttributeM.slot, scope)"
              >
                Add
              </el-button>
              <el-table :data="scope.row.slots">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="Argument Name" prop="key" />
                <el-table-column label="Argument Value" prop="value" />
                <el-table-column label="">
                  <template #default="scope">
                    <el-button @click="deleteAttr(scope)"> delete </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <h3>Emits</h3>
              <el-button
                @click="showAddattrDialog(models.AttributeM.emit, scope)"
              >
                Add
              </el-button>
              <el-table :data="scope.row.emits">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="Key" prop="key" />
                <el-table-column label="Value" prop="value" />
                <el-table-column label="">
                  <template #default="scope">
                    <el-button @click="deleteAttr(scope)"> delete </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Text" prop="text" sortable />
        <el-table-column label="Instruction" prop="instruction" sortable />
      </el-table>
    </div>
    <el-divider direction="vertical" />
    <div class="edges">
      <el-button @click="state.addEdgeFormVisible = true">Add</el-button>
      <div class="add-edge-form" v-if="state.addEdgeFormVisible">
        <el-form
          :inline="true"
          :model="state.formInline"
          class="demo-form-inline"
        >
          <el-form-item label="Source attribute id">
            <el-input v-model="state.formInline.source" clearable />
          </el-form-item>
          <el-form-item label="Target attribute id">
            <el-input v-model="state.formInline.target" clearable />
          </el-form-item>
          <!-- <el-form-item label="Text">
            <el-input v-model="state.formInline.text" clearable />
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="addEdge">Confirm</el-button>
            <el-button @click="state.addEdgeFormVisible = false"
              >Cancel and save</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-input
        class="filter-search"
        v-model="state.edgeSearch"
        size="small"
        placeholder="Type to search"
      />
      <el-table :data="filterEdges" style="width: 100%">
        <el-table-column type="expand">
          <template #default="scope">
            <div m="4" class="attr_table">
              <h3>Source Attr ID</h3>
              <div>{{ scope.row.source.attr_id }}</div>
              <h3>Source Node ID</h3>
              <div>{{ scope.row.source.node_id }}</div>
              <h3>Target Attr ID</h3>
              <div>{{ scope.row.target.attr_id }}</div>
              <h3>Target Node ID</h3>
              <div>{{ scope.row.target.node_id }}</div>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Text" prop="text" /> -->
        <el-table-column label="Source Text" prop="source.text" />
        <el-table-column label="Target Text" prop="target.text" />
        <el-table-column label="">
          <template #default="scope">
            <el-button @click="deleteEdge(scope)"> delete </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="dialogs">
      <el-dialog
        v-model="state.modifyInstructionDialogVisible"
        title=""
        width="30%"
      >
        <el-select
          v-model="state.modifyInstructionWord"
          filterable
          remote
          reserve-keyword
          placeholder="Please enter a keyword"
          :remote-method="filterIntructions"
        >
          <el-option
            v-for="(item, index) in state.instructionFiltered"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="state.modifyInstructionDialogVisible = false"
              >Cancel</el-button
            >
            <el-button type="primary" @click="modifyInstructionWord">
              Confirm
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog v-model="state.addAtrrDialogVisible" title="" width="30%">
        <el-form
          :inline="true"
          :model="state.formInDialog"
          class="demo-form-inline"
        >
          <el-form-item label="Argument Name">
            <el-select
              v-model="state.formInDialog.key"
              filterable
              reserve-keyword
              placeholder="Please choose"
            >
              <el-option
                v-for="(item, index) in filterAttrs"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Argument Value">
            <el-input
              v-model="state.formInDialog.value"
              placeholder="Argument Value"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAttr">Confirm</el-button>
            <el-button @click="state.addAtrrDialogVisible = false"
              >Close</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
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

const addAttr = async () => {
  const addingAttrScope = state.addingAttrScope as { row: { id: string } };
  const nodeId = searchNodeIdByAttrId(addingAttrScope.row.id) as string;
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
._graph-table {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: stretch;
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
}
</style>
