import BaseService from "@/service/BaseService";
class AdminService extends BaseService {
  constructor() {
    super("/admin");
  }

  async login(account) {
    return await this.axiosBase("/login", account, "post");
  }
}

export default new AdminService();
