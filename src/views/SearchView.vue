<template>
  <div class="_search">
    <el-input
      v-model="state.input"
      placeholder="Please input"
      class="input-with-select"
      size="large"
    >
      <template #append>
        <el-button :icon="Search" @click="search" />
      </template>
    </el-input>
    <el-divider />
    <div class="results" v-loading="state.pending">
      <SearchList :table-data="state.hits" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import * as models from "@/models";
import * as api from "@/api";
import SearchList from "@/components/SearchList.vue";

interface stateM {
  hits: models.searchHitM[];
  input: string;
  pending: boolean;
}

const state: stateM = reactive({
  hits: [] as unknown as models.searchHitM[],
  input: "",
  pending: false,
});

const enter = (event: KeyboardEvent) => {
  event.keyCode === 13 && search();
};

const search = async () => {
  state.pending = true;
  const res = await api.reqSearch(state.input);
  state.pending = false;
  state.hits = res.slice(0, 30);
};
</script>

<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
