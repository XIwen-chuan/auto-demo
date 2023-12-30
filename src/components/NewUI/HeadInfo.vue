<template>
  <div class="_head-info">
    <div class="title">{{ props.title }}</div>
    <div class="progress-bar">
      <el-progress
        :percentage="props.percentage"
        :color="customColor"
        :show-text="false"
      />
    </div>
    <div class="detail">
      {{ props.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  percentage: Number,
  text: String,
  title: String,
});

const percentage = ref(20);
const customColor = ref("#42BFB4");
</script>

<style lang="scss" scoped>
._head-info {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 15px 30px;
  background: #e1ebf5;

  border-radius: 4px;
  border: 3px solid #deebf6;
  background: #e3edf7;
  box-shadow: 0px 2px 4px 0px #c8d4e2 inset, 4px 2px 6px 0px #b1c5d5 inset,
    3px 6px 6px 0px #c3d7e7 inset,
    -6px -3px 5px 0px rgba(255, 255, 255, 0.75) inset;
  .title {
    color: #6e81a0;
    text-align: start;
    font-family: Rubik;
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px; /* 74.286% */
  }
  .progress-bar {
    margin-top: 10px;
    height: 10px;
    fill: linear-gradient(135deg, #e1edf8 0%, #eef1f3 100%);
    stroke-width: 1.547px;
    stroke: #cfdbe7;
    box-shadow: 0px 1px 9px 0px #c8d4e2 inset, 0px 3px 7px 0px #c9d3e2 inset,
      -5px -4px 5px 0px rgba(255, 255, 255, 0.75) inset;
  }
  .detail {
    margin-top: 10px;
    color: #6e81a0;
    text-shadow: 0px 1px 1px rgba(39, 44, 54, 0.2);
    text-align: start;
    font-family: Rubik;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 104% */
  }
}
</style>
