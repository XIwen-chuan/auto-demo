<template>
  <div class="common-layout">
    <el-container>
      <el-header>Protocol</el-header>
      <el-container>
        <el-aside width="200px"
          ><AsideBar @menu-item-click="menuItemClickHandler"
        /></el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script lang="ts" setup>
import AsideBar from "@/components/AsideBar.vue";
import router from "./router";
import { useProtocolStore } from "@/store";

const protocalStore = useProtocolStore();

const menuItemClickHandler = (itemIndex: number) => {
  router.push({ name: itemIndex == 1 ? "home" : "search" });
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .el-header {
    background-color: var(--primary-light3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: larger;
    font-weight: bolder;
    color: white;
  }
  .el-aside {
    background-color: var(--primary-light7);
  }
  .el-container {
    min-height: calc(100vh - 60px);
  }
  .el-backtop {
    background-color: var(--primary-light5);
  }
}
</style>
