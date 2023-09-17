<template>
  <div class="_search">
    <el-input
      v-model="state.input"
      placeholder="Please input"
      class="input-with-select"
      size="large"
    >
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-divider />
    <div class="results"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import * as models from "@/models";

interface stateM {
  hits: models.searchHitsListM;
  input: string;
}

const state: stateM = reactive({
  hits: [] as unknown as models.searchHitsListM,
  input: "",
});
</script>

<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
