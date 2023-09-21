<template>
  <div class="_search-list">
    <el-table
      :data="props.tableData"
      style="width: 100%"
      :table-layout="'fixed'"
    >
      <el-table-column prop="_id" label="Id" :width="100" :align="`center`" />
      <el-table-column
        prop="_source.name"
        label="Name"
        :width="100"
        :align="`center`"
      />
      <el-table-column
        prop="_source.procedure"
        label="Procedure"
        :width="800"
        :align="`center`"
      />
      <el-table-column prop="_score" label="Search Score" :align="`center`" />
      <el-table-column fixed="right" label="Operations" :align="`center`">
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
import { defineProps, reactive } from "vue";
import * as models from "@/models";
import router from "@/router";
const props = defineProps<{
  tableData: models.searchHitM[];
}>();

const detailClickHandler = async (scope: any) => {
  console.log(scope);
  let identity;
  const match = scope.row._source.name.match(/_(.*?)\.json/);
  if (match) {
    identity = match[1];
    console.log(identity); // 输出：pex-1478
  } else {
    console.log("未找到匹配的部分");
  }
  const path = `https://helixon.yzhu.io/#/protocol-item/${identity}/view`;
  window.open(path);
};

const graphClickHandler = async (scope: any) => {
  router.push({
    name: "protocol",
    params: {
      filename: scope.row._source.name,
    },
  });
};
</script>

<style lang="scss">
._search-list {
  tr {
    height: 200px;
    td {
      div {
        height: 200px;
        overflow: hidden;
        /*文本不会换行*/
        white-space: nowrap;
        /*当文本溢出包含元素时，以省略号表示超出的文本*/
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
