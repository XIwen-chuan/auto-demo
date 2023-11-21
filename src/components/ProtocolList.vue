<template>
  <div class="_protocol-list">
    <el-table
      :data="props.tableData"
      style="width: 100%"
      :table-layout="'fixed'"
    >
      <el-table-column prop="title" label="Title" :align="`center`" />
      <el-table-column
        prop="identity"
        label="Identity"
        :width="200"
        :align="`center`"
      />
      <el-table-column
        prop="attributes.keywords"
        label="Keywords"
        :width="800"
        :align="`center`"
      />
      <el-table-column
        prop="checked"
        label="Checked"
        width="100"
        :filters="[
          { text: 'Checked', value: true },
          { text: 'Unchecked', value: false },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-check-tag
            :checked="scope.row.checked"
            @change="onTagChange(scope)"
            disable-transitions
            >{{ scope.row.checked }}</el-check-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="graphClickHandler(scope)"
            >Graph</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="detailClickHandler(scope)"
            >Detail</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import * as models from "@/models";
import * as api from "@/api";
import router from "@/router";
const props = defineProps<{
  tableData: models.ProtocalM[];
}>();

const emits = defineEmits<{
  (e: "toggle-checked", filename: string): void;
}>();

const detailClickHandler = async (scope: any) => {
  const path = `https://helixon.yzhu.io/#/protocol-item/${scope.row.identity}/view`;
  window.open(path);
};

const graphClickHandler = async (scope: any) => {
  const filename = "protocol_" + scope.row.identity + ".json";
  router.push({
    name: "protocol",
    params: {
      filename,
    },
  });
};

const onTagChange = async (scope: any) => {
  const filename = "protocol_" + scope.row.identity + ".json";
  console.log("onTagChange", scope);
  await api.reqToggleProtocolChecked(filename);
  emits("toggle-checked", filename);
};

const filterTag = (value: boolean, row: models.ProtocalM) => {
  return row.checked === value;
};
</script>

<style lang="scss">
._protocol-list {
  .el-check-tag.is-checked {
    background-color: #f0f9eb;
    border-color: #b3e19d;
    color: #67c23a;
  }
}
</style>
