import axios from "axios";
import { ElNotification } from "element-plus";

axios.defaults.baseURL = "/api";


axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem("access_token");
    config.headers.authorization = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log(response.data);
    if (response.data.resultCode != 0) {
      ElNotification.error({
        title: "错误",
        message: response.data.resultMsg,
        duration: 1500,
      });
    }
    return response;
  },
  error => {
    const defaultNotify = {
      title: "网络错误",
      message: "未知错误",
      duration: 1500,
    };
    if (error.code === "ECONNABORTED" || error.message.indexOf("timeout") !== -1 || error.message === "Network Error") {
      defaultNotify.message = "网络异常";
      ElNotification.error(defaultNotify);
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 403:
        defaultNotify.message = "拒绝访问(403)";
        ElNotification.error(defaultNotify);
        break;
      case 404:
        defaultNotify.message = "资源不存在(404)";
        ElNotification.error(defaultNotify);
        break;
      case 408:
        defaultNotify.message = "请求超时(404)";
        ElNotification.error(defaultNotify);
        break;
      case 500:
        defaultNotify.message = "服务器错误(500)";
        ElNotification.error(defaultNotify);
        break;
      case 501:
        defaultNotify.message = "服务未实现(501)";
        ElNotification.error(defaultNotify);
        break;
      case 502:
        defaultNotify.message = "网络错误(502)";
        ElNotification.error(defaultNotify);
        break;
      case 503:
        defaultNotify.message = "服务不可用(503)";
        ElNotification.error(defaultNotify);
        break;
      case 504:
        defaultNotify.message = "网络超时(504)";
        ElNotification.error(defaultNotify);
        break;
      case 505:
        defaultNotify.message = "HTTP版本不受支持(505)";
        ElNotification.error(defaultNotify);
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default function axiosApi(url, data, method) {
  return new Promise((resolve, reject) => {
    if (method === "get") {
      axios({
        method,
        url,
        params: data,
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    } else {
      axios({
        method,
        url,
        data,
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    }
  });
}
