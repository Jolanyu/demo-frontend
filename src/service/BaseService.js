import axiosApi from "@/axios/AxiosConfig";
export default class BaseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.axiosApi = axiosApi;
  }

  async axiosBase(url, data, method) {
    if (method === "get") {
      let query = "";
      if (data) {
        query =
          "?" +
          Object.keys(data)
            .map(key => key + "=" + data[key])
            .join("&");
      }
      return await this.axiosApi(this.baseUrl + url + query, null, method);
    } else {
      return await this.axiosApi(this.baseUrl + url, data, method);
    }
  }

  async delete(id) {
    return await this.axiosBase("/" + id, null, "delete");
  }

  async getCount() {
    return await this.axiosBase("/count", null, "get");
  }

  async getByPage(page, size) {
    return await this.axiosBase("", { page: page, size: size }, "get");
  }

  async create(data) {
    return await this.axiosBase("", data, "post");
  }

  async update(id, data) {
    return await this.axiosBase("/" + id, data, "put");
  }
}
