import axios from "axios";
import { ElMessage } from "element-plus";

const requests = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? `/` : '/api',
  baseURL: "/",
  // 是否跨站点访问控制请求
  //withCredentials: true,
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true;
  },
});

// 请求拦截器
requests.interceptors.request.use((config: any) => {
  config.headers.Authorization = `ApiKey azd5ZU80c0J3d1plSmZLSUtUbTk6YVJhV01IQ0RRMEdra1RSZFkxTm5nZw==`;
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  (response: any) => {
    console.log(response);
    const status = response.status;
    if (status < 200 || status >= 300) {
      // 处理http错误，抛到业务代码
      response.data.code = 0;
    } else {
      response.data.code = 1;
    }
    return response;
  },
  (error) => {
    console.log("error: " + error);
    if (axios.isCancel(error)) {
      console.log("repeated request: " + error.message);
    } else {
      // 错误抛到业务代码
      error.data = {};
      error.data.code = 0;
      error.data.msg = "Network error!";
      ElMessage("Network error!");
    }
    return Promise.resolve(error);
  }
);

export default requests;
