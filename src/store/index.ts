import axios from "axios";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useProtocolStore = defineStore("protocolStore", {
  state: () => ({
    count: 0,
    name: "Eduardo",
    initialProtocolList: [],
    humanModifiedIsa: {} as any,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    getInitialProtocolList() {
      return [];
    },
    async testJsonOutput() {
      try {
        const response = await axios.get(
          "./data/protocols/protocol_nprot-4.json"
        ); // 根据您的项目结构和配置，可能需要调整路径
        const jsonData = response.data;
        console.log(jsonData);
      } catch (error) {
        console.error("加载和解析JSON时出错：", error);
      }
    },
    reportNetworkError() {
      ElMessage.error("Network error.");
    },
    reportNotFoundError(name: string) {
      ElMessage.info(name + " not found.");
    },
    storeHumanModifiedIsa(humanModifiedIsa: any) {
      this.humanModifiedIsa = humanModifiedIsa;
    },
  },
});
