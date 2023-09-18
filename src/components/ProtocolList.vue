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
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick"
            :disabled="true"
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
import { defineProps, nextTick, reactive } from "vue";
import * as models from "@/models";
import router from "@/router";
const props = defineProps<{
  tableData: models.ProtocalM[];
}>();

const handleClick = () => {
  console.log("click");
};

const detailClickHandler = async (scope: any) => {
  console.log(scope);
  const path = `https://helixon.yzhu.io/#/protocol-item/${scope.row.identity}/view`;
  window.open(path);
};
</script>
