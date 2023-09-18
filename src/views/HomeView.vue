<template>
  <div class="_protocols">
    <h1>Nodes:</h1>
    <ProtocolList :table-data="state.tableData" />
  </div>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="state.currentPage"
      v-model:page-size="state.pageSize"
      :background="true"
      layout="prev, pager, next, jumper"
      :total="3000"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import AnnotationForm from "@/components/AnnotationForm.vue";
import ProtocolList from "@/components/ProtocolList.vue";
import { ref, defineEmits, nextTick, reactive, onMounted } from "vue";
import * as models from "@/models";
import * as api from "@/api";

const parentBorder = ref(false);
const childBorder = ref(false);
const emits = defineEmits(["cell-btn-click"]);

const state = reactive({
  cellClicked: {} as any,
  showDialog: false,
  tableData: [] as models.ProtocalM[],
  pageSize: 30,
  currentPage: 1,
});

const cellClickHandler = (item: any) => {
  console.log(item);
  state.cellClicked = item;
};

const handleClick = async (item: any) => {
  await nextTick();
  emits("cell-btn-click", state.cellClicked);
  state.showDialog = true;
};

const handleCurrentChange = async (val: number) => {
  console.log(`current page: ${val}`);
  state.currentPage = val;
  const res = await getProtocolList();
  state.tableData = res;
};

const getProtocolList = async () => {
  const res = await api.reqGetProtocolList(
    state.pageSize * (state.currentPage - 1),
    state.pageSize
  );
  return res;
};

onMounted(async () => {
  const res = await getProtocolList();
  console.log(res);
  state.tableData = res;
});
</script>
