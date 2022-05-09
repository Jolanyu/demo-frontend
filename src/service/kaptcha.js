import axiosApi from "../axios/AxiosConfig";
class Kaptcha {
  async get() {
    return await axiosApi("/kaptcha", {}, "get");
  }
}

export default new Kaptcha();
