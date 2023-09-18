import axios from "axios";
import { AxiosPromise } from "axios";
import * as models from "@/models";
import Qs from "qs";
import requests from "./requests";
import { ElMessage } from "element-plus";

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
    url: "search-test/_search?pretty",
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
    return [];
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
    return [];
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
    ElMessage.error("Network error");
    return [];
  }

  return res.data as models.GraphM;
}
