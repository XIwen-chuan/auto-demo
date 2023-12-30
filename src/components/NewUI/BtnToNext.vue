<template>
  <div class="_btn-to-next">
    <img src="@/assets/btnToNextOutline.svg" alt="" class="outline" />
    <img src="@/assets/btnToNextInline.svg" alt="" class="inline" />
    <div class="text" @click="$emit('click')">NEXT STEP</div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
._btn-to-next {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 180px;
  height: 180px;
  cursor: pointer;
  .outline {
    position: absolute;
    width: 180px;
    height: 180px;
    pointer-events: none;
  }
  .inline {
    position: absolute;
    top: 35px;
    left: 23px;
    width: 136px;
    height: 136px;
    pointer-events: none;
  }
  .text {
    position: relative;
    right: 4px;
    top: 2px;
    width: 99px;
    color: #6e81a0;
    text-align: center;
    font-family: Rubik;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 114.286% */
    text-transform: uppercase;
    z-index: 1;
  }
}
</style>
