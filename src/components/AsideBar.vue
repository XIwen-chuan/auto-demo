<template>
  <div class="_asidebar">
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1" @click="menuItemClick">
        <el-icon><List /></el-icon>
        <span>Protocol List</span>
      </el-menu-item>
      <el-menu-item index="2" @click="menuItemClick">
        <el-icon><Search /></el-icon>
        <span>Protocol Search</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { List, Search } from "@element-plus/icons-vue";
import { defineEmits } from "vue";
const emits = defineEmits(["menuItemClick"]);

const menuItemClick = (item: any, item2: any) => {
  console.log(item);
  console.log(item2);
  emits("menuItemClick", item.index);
};
</script>

<style lang="scss">
.el-menu {
  background-color: var(--primary-light8);
}
</style>
