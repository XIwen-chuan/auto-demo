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
        <GraphTable
          :graph="state.graph"
          :filename="state.filename"
          @add-attr="addAttr"
          @delete-attr="deleteAttr"
          @add-edge="addEdge"
          @delete-edge="deleteEdge"
          @modify-instruction="modifyInstruction"
        />
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
import { genFileId, textProps } from "element-plus";
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

const addAttr = (
  nodeId: string,
  attrId: string,
  attrType: models.AttributeM,
  key: string,
  value: string
) => {
  // 在 state.graph 中对应的 node 添加对应类型的 attribute
  if (attrType == models.AttributeM.emit) {
    state.graph.nodes.forEach((node) => {
      if (node.id == nodeId) {
        node.emits.push({
          id: attrId,
          node_id: nodeId,
          key: key,
          value: value,
        });
      }
    });
  } else {
    state.graph.nodes.forEach((node) => {
      if (node.id == nodeId) {
        node.slots.push({
          id: attrId,
          node_id: nodeId,
          key: key,
          value: value,
        });
      }
    });
  }
};

const deleteAttr = (attrId: string) => {
  // 在 state.graph 中删除对应的 attribute
  state.graph.nodes.forEach((node) => {
    node.emits = node.emits.filter((emit) => emit.id != attrId);
    node.slots = node.slots.filter((slot) => slot.id != attrId);
    console.log("node.emits", node.emits);
  });
  // 删除掉包含该 attribute 的 edge
  state.graph.edges = state.graph.edges.filter(
    (edge) => edge.source.attr_id != attrId && edge.target.attr_id != attrId
  );
};

const addEdge = (
  edgeId: string,
  source: models.Source,
  target: models.Target,
  text: string
) => {
  // 在 state.graph 中添加对应的 edge
  state.graph.edges.unshift({
    id: edgeId,
    text: text,
    source: source,
    target: target,
  });
};

const deleteEdge = (edgeId: string) => {
  // 在 state.graph 中删除对应的 edge
  state.graph.edges = state.graph.edges.filter((edge) => edge.id != edgeId);
};

const modifyInstruction = (nodeId: string, instruction: string) => {
  // 在 state.graph 中修改对应的 node 的 instruction
  state.graph.nodes.forEach((node) => {
    if (node.id == nodeId) {
      node.instruction = instruction;
    }
  });
};

function topologicalSort(graph: models.GraphM): models.Node[] {
  const result: models.Node[] = [];
  const visited: Record<string, boolean> = {};

  function visit(node: models.Node) {
    if (!visited[node.id]) {
      visited[node.id] = true;
      node.slots.forEach((slot) => {
        const targetNode = graph.nodes.find((n) => n.id === slot.node_id);
        if (targetNode) {
          visit(targetNode);
        }
      });
      result.unshift(node);
    }
  }

  graph.nodes.forEach((node) => {
    if (!visited[node.id]) {
      visit(node);
    }
  });

  return result;
}

// 对 resProtocalGraph 进行拓扑排序
function topologicalSortGraph(graph: models.GraphM): models.GraphM {
  const sortedNodes = topologicalSort(graph);

  // 创建一个新的图对象，将节点和边按照排序后的顺序重新组织
  const sortedGraph: models.GraphM = {
    ...graph,
    nodes: sortedNodes,
    edges: [],
  };

  // 重组边的顺序
  graph.edges.forEach((edge) => {
    const sourceNode = sortedNodes.find(
      (node) => node.id === edge.source.node_id
    );
    const targetNode = sortedNodes.find(
      (node) => node.id === edge.target.node_id
    );
    if (sourceNode && targetNode) {
      sortedGraph.edges.push({
        ...edge,
        source: {
          ...edge.source,
          node_id: sourceNode.id,
        },
        target: {
          ...edge.target,
          node_id: targetNode.id,
        },
      });
    }
  });

  return sortedGraph;
}

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
    const sortedGraph = topologicalSortGraph(resProtocalGraph);
    console.log("sortedGraph", sortedGraph);
    // 对 resProtocalGraph 进行拓扑排序
    state.graph = sortedGraph;
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
