<template>
  <div class="_attr-list">
    <div class="attr" v-for="(item, index) in attrs" :key="index">
      <div class="key">{{ item.key }}</div>
      <input type="text" class="value" v-model="item.value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const attrs = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const state = reactive({
  attrs: [
    {
      key: "temperature",
      value: "room temperature",
    },
    {
      key: "time",
      value: "1 hour",
    },
  ],
});
</script>

<style lang="scss" scoped>
._attr-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  .attr {
    padding: 10px 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 800px;
    height: 110px;
    margin-bottom: 27px;

    border-radius: 4px;
    border: 3px solid #deebf6;
    background: #e3edf7;
    box-shadow: 0px 2px 4px 0px #d1dbe7 inset, 4px 2px 6px 0px #c1d4e4 inset,
      3px 6px 6px 0px #cddeec inset,
      -6px -3px 5px 0px rgba(255, 255, 255, 0.85) inset;
    .key {
      color: #6e81a0;

      text-align: center;
      font-family: Rubik;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px; /* 74.286% */
    }
    .value {
      height: 55px;
      width: 420px;
      flex-shrink: 0;
      border-radius: 27.5px;
      border: 2px solid #deebf6;
      background: #e3edf7;
      box-shadow: 0px 2px 4px 0px #d1dbe7 inset, 4px 2px 6px 0px #c1d4e4 inset,
        3px 6px 6px 0px #cddeec inset,
        -6px -3px 5px 0px rgba(255, 255, 255, 0.85) inset;

      padding: 11px 20px;
      box-sizing: border-box;
      text-shadow: 0px 1px 1px rgba(39, 44, 54, 0.2);
      font-family: Rubik;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 32px; /* 91.429% */
      letter-spacing: -0.343px;
    }
  }
}
</style>
