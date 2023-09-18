const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://175.24.197.94:8000",
        ws: true,
        changeOrigin: true,
      },
      "/search-test": {
        target:
          "https://cc94467d881a4334a44fd40e5d12085a.asia-east1.gcp.elastic-cloud.com:443",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
