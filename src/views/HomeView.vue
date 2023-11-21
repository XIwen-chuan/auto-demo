<template>
  <div class="_protocols">
    <div class="protocols-list">
      <h1>Protocols:</h1>
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
      <div v-loading="state.loading" class="list">
        <ProtocolList
          :table-data="state.tableData"
          @toggle-checked="toggleChecked"
        />
      </div>
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
  </div>
</template>

<script lang="ts" setup>
import ProtocolList from "@/components/ProtocolList.vue";
import { ref, defineEmits, nextTick, reactive, onMounted } from "vue";
import { useProtocolStore } from "@/store";
import * as models from "@/models";
import * as api from "@/api";

const protocolStore = useProtocolStore();
const parentBorder = ref(false);
const childBorder = ref(false);
const emits = defineEmits(["cell-btn-click"]);

const state = reactive({
  cellClicked: {} as any,
  showDialog: false,
  tableData: [] as models.ProtocalM[],
  pageSize: 30,
  currentPage: 1,
  loading: true,
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
  state.loading = true;
  const res = await getProtocolList();
  if (!res) {
    protocolStore.reportNetworkError();
    return;
  }
  state.loading = false;
  state.tableData = res;
};

const getProtocolList = async () => {
  const res = await api.reqGetProtocolList(
    state.pageSize * (state.currentPage - 1),
    state.pageSize
  );
  return res;
};

const toggleChecked = (filename: string) => {
  const identity = filename.split(".")[0].split("_")[1];
  const index = state.tableData.findIndex((item) => item.identity === identity);
  if (index === -1) {
    return;
  }
  state.tableData[index].checked = !state.tableData[index].checked;
};

onMounted(async () => {
  const res = await getProtocolList();
  if (!res) {
    protocolStore.reportNetworkError();
    return;
  }
  console.log(res);
  state.loading = false;
  state.tableData = res;
});
</script>

<style lang="scss" scoped>
._protocols {
  padding: 20px;
  font-family: Arial, sans-serif;
  .demo-pagination-block {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .list {
    min-height: 500px;
  }
}
</style>
