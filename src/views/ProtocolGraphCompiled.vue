<template>
  <div class="_protocol-graph-compiled">
    <h1>Compiled protocol</h1>
    <div class="graph" v-loading="state.loading">
      <div v-if="!state.noGraph">
        <GraphTableStatic :graph="state.graph" :filename="state.filename" />
      </div>
      <div v-else>
        <el-empty :image-size="200" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import * as models from "@/models";
import { useRoute } from "vue-router";
import * as api from "@/api";
import GraphTableStatic from "@/components/GraphTableStatic.vue";

const route = useRoute();

interface stateM {
  graph: models.GraphM;
  noGraph: boolean;
  protocal: models.ProtocalM;
  loading: boolean;
  filename: string;
}

const state: stateM = reactive({
  graph: {} as models.GraphM,
  filename: "",
  noGraph: false,
  protocal: {} as models.ProtocalM,
  loading: true,
});

onMounted(async () => {
  const filename = route.params.filename as string;
  state.filename = filename;
  const resProtocalGraph = await api.reqGetCompiledGraph(filename);
  if (resProtocalGraph) {
    state.graph = resProtocalGraph;
  } else {
    state.noGraph = true;
  }
  state.loading = false;
});
</script>
