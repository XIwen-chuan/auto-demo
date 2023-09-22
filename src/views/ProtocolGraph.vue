<template>
  <div class="_protocol-graph" v-loading="state.loading">
    <div class="info" v-if="!state.loading">
      <ProtocalDetail :table-data="state.protocal" />
    </div>
    <el-divider />
    <div class="graph" v-loading="state.loading">
      <div v-if="!state.noGraph">
        <div class="download">
          <el-button type="primary" :icon="Download">
            <a
              :href="`/api/download_json/?filename=${state.filename}`"
              target="_blank"
            >
              download graph json
            </a>
          </el-button>
        </div>
        <GraphTable :graph="state.graph" :filename="state.filename" />
      </div>
      <div v-else>
        <div class="hint">
          This protocol does not yet have an graph json file. Do you want to
          upload the file?
        </div>
        <div class="upload">
          <el-upload
            name="file"
            ref="upload"
            class="upload-demo"
            action="/api/upload_json/"
            method="post"
            accep="application/json"
            :headers="state.uploadHeader"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button type="primary">select file</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
              upload to server
            </el-button>
            <template #tip>
              <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file. Only graph json
                exported from the AutoBio website is accepted
              </div>
            </template>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps, onMounted, ref, nextTick } from "vue";
import { useProtocolStore } from "@/store";
import * as models from "@/models";
import * as api from "@/api";
import { useRoute } from "vue-router";
import ProtocalDetail from "@/components/ProtocalDetail.vue";
import GraphTable from "@/components/GraphTable.vue";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { genFileId } from "element-plus";
import { Download } from "@element-plus/icons-vue";
import router from "@/router";

const protocolStore = useProtocolStore();

const route = useRoute();

interface stateM {
  graph: models.GraphM;
  noGraph: boolean;
  protocal: models.ProtocalM;
  loading: boolean;
  filename: string;
  uploadHeader: any;
}

const state: stateM = reactive({
  graph: {} as models.GraphM,
  noGraph: false,
  protocal: {} as models.ProtocalM,
  loading: true,
  filename: "",
  uploadHeader: {},
});

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = async () => {
  upload.value!.submit();
  await nextTick();
  router.go(0);
};

onMounted(async () => {
  // 1.获取 protocol detail
  // 2. 获取相应的 graph detail
  const filename = route.params.filename as string;
  state.filename = filename;
  const resProtocalInfo = await api.reqGetProtocol(filename);
  const resProtocalGraph = await api.reqGetGraph(filename);
  if (!resProtocalInfo) {
    protocolStore.reportNetworkError();
    return;
  } else {
    state.protocal = resProtocalInfo;
  }
  if (!resProtocalGraph) {
    protocolStore.reportNotFoundError("Graph");
    state.noGraph = true;
  } else {
    state.graph = resProtocalGraph;
  }
  state.uploadHeader = { "Protocol-Filename": state.filename };
  console.log("resProtocalInfo", resProtocalInfo);
  console.log("resProtocalGraph", resProtocalGraph);
  state.loading = false;
});
</script>

<style lang="scss">
.hint {
  font-size: 16px;
  margin-bottom: 20px;
  .el-upload {
    margin-right: 20px;
  }
}
</style>
