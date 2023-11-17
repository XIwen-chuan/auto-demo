import axios from "axios";
import { AxiosPromise } from "axios";
import * as models from "@/models";
import Qs from "qs";
import requests from "./requests";
import { ElMessage } from "element-plus";
import { useProtocolStore } from "@/store";

const protocolStore = useProtocolStore();

// export async function reqLink(
//   sourceAttrId: number | string,
//   targetAttrId: number | string,
//   content: string
// ) {
//   const params = {
//     test: "test",
//   };
//   const res = await requests({
//     url: "example",
//     data: params,
//     method: "post",
//   });
// }

export async function reqSearch(searchStr: string) {
  const params = {
    query: {
      query_string: {
        query: searchStr,
      },
    },
  };
  const res = await requests({
    url: "search-new/_search?pretty",
    data: params,
    method: "post",
  });
  if (!res.data.code) {
    ElMessage.error("Network error");
    return [];
  }
  const searchResult = res.data as models.searchResM;
  return searchResult.hits.hits;
}

// export async function reqMakeAnnotation(
//   attrId: number | string,
//   key: string,
//   value: string
// ) {
//   const params = {
//     test: "test",
//   };
//   const res = await requests({
//     url: "example",
//     data: params,
//     method: "post",
//   });
// }

export async function reqGetProtocol(filename: string) {
  const params = {
    filename,
  };
  const res = await requests({
    url: "api/protocol/",
    params,
    method: "get",
  });
  if (!res.data.code) {
    ElMessage.error("Network error");
    return false;
  }

  return res.data as models.ProtocalM;
}

export async function reqGetProtocolList(skip = 0, limit = 15) {
  const params = {
    skip,
    limit,
  };
  const res = await requests({
    url: "api/protocol/list/",
    params,
    method: "get",
  });
  if (!res.data.code) {
    ElMessage.error("Network error");
    return false;
  }

  return res.data as models.ProtocalM[];
}

export async function reqGetGraph(filename: string) {
  const params = {
    filename,
  };
  const res = await requests({
    url: "api/protocol/graph/",
    params,
    method: "get",
  });
  if (!res.data.code) {
    return false;
  }

  return res.data as models.GraphM;
}

export async function reqGetCompiledGraph(filename: string) {
  const params = {
    filename,
  };
  const res = await requests({
    url: "api/protocol/graph/compiled/",
    params,
    method: "get",
  });
  if (!res.data.code) {
    return false;
  }

  return res.data as models.GraphM;
}

export async function reqAddEdge(
  filename: string,
  source: models.Source,
  target: models.Target,
  text: string
) {
  const params = {
    filename,
    source_node_id: source.node_id,
    source_attr_id: source.attr_id,
    target_node_id: target.node_id,
    target_attr_id: target.attr_id,
    text,
  };
  const res = await requests({
    url: "api/edge/",
    params,
    method: "post",
  });
  console.log("reqAddEdge");
  return res.data.edge_id;
}

export async function reqDeleteEdge(filename: string, id: string) {
  const params = {
    filename,
    edge_id: id,
  };
  await requests({
    url: "api/edge/",
    params,
    method: "delete",
  });
  return true;
}

export async function reqModifyInstruction(
  filename: string,
  node_id: string,
  newIntru: string
) {
  const params = {
    filename,
    node_id,
    new_instruction: newIntru,
  };
  await requests({
    url: "api/instruction/",
    params,
    method: "put",
  });
  console.log("reqModifyInstruction");
  return true;
}

export async function reqDeleteAttr(
  filename: string,
  node_id: string,
  attr_id: string
) {
  const params = {
    filename,
    attr_id,
  };
  await requests({
    url: "api/attr/",
    params,
    method: "delete",
  });
  console.log("reqDeleteAttr");
  return true;
}

export async function reqAddAttr(
  filename: string,
  node_id: string,
  key: string,
  value: string,
  type: models.AttributeM
) {
  const params = {
    filename,
    node_id,
    key,
    value,
    attr_type: type,
  };
  const res = await requests({
    url: "api/attr/",
    params,
    method: "post",
  });
  console.log("reqAddAttr");
  return res.data.attr_id;
}

// done
export async function reqUploadOldGraphJson() {
  console.log("reqUploadOldGraphJson");
}

export async function reqDownloadGraphJson(filename: string) {
  console.log("reqDownloadGraphJson");
}

export async function reqGetHumanModifiedIsaJson() {
  const res = await requests({
    url: "api/isa/",
    method: "get",
  });
  console.log("reqGetHumanModifiedIsaJson");
  protocolStore.storeHumanModifiedIsa(res.data);
}
