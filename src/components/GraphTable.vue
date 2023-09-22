<template>
  <div class="_graph-table">
    <div class="nodes">
      <el-table :data="props.graph.nodes" style="width: 100%">
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
                <el-table-column label="Key" prop="key" />
                <el-table-column label="Value" prop="value" />
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
        <el-table-column label="Text" prop="text" />
        <el-table-column label="Instruction" prop="instruction" />
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
          <el-form-item label="Text">
            <el-input v-model="state.formInline.text" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addEdge">Confirm</el-button>
            <el-button @click="state.addEdgeFormVisible = false"
              >Cancel and save</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="props.graph.edges" style="width: 100%">
        <el-table-column label="Text" prop="text" />
        <el-table-column label="Source" prop="source.attr_id" />
        <el-table-column label="Target" prop="target.attr_id" />
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
        title="Tips"
        width="30%"
      >
        <el-input
          placeholder="New instruction"
          v-model="state.modifyInstructionWord"
        />
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
      <el-dialog v-model="state.addAtrrDialogVisible" title="Tips" width="30%">
        <el-form
          :inline="true"
          :model="state.formInDialog"
          class="demo-form-inline"
        >
          <el-form-item label="Key">
            <el-input
              v-model="state.formInDialog.key"
              placeholder="Key"
              clearable
            />
          </el-form-item>
          <el-form-item label="Value">
            <el-input
              v-model="state.formInDialog.value"
              placeholder="Value"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAttr">Confirm</el-button>
            <el-button @click="state.addAtrrDialogVisible = false"
              >Save and close</el-button
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
} from "vue";
import * as models from "@/models";
import * as api from "@/api";
import { ElMessageBox } from "element-plus";
import router from "@/router";

const state = reactive({
  modifyInstructionDialogVisible: false,
  modifyInstructionWord: "",
  modifyInstructionScope: {},
  addEdgeFormVisible: false,
  addAtrrDialogVisible: false,
  addingAtrrType: models.AttributeM.slot,
  addingAttrScope: {},
  formInline: {
    source: "",
    target: "",
    text: "",
  },
  formInDialog: {
    key: "",
    value: "",
  },
});

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
  const targetNodeId = searchNodeIdByAttrId(state.formInline.target);
  if (!sourceNodeId || !targetNodeId) {
    ElMessageBox.alert("Source or target not found");
    return;
  }
  const source: models.Source = {
    node_id: sourceNodeId,
    attr_id: state.formInline.source,
  };
  const target: models.Target = {
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

onMounted(() => {
  console.log("props", props);
  console.log("props.graph", props.graph);
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
  }
}
</style>
