import BaseService from "@/service/BaseService";

class BookService extends BaseService {
  constructor() {
    super("/book");
  }
  async get(bookId) {
    return await this.axiosBase("/" + bookId, null, "get");
  }
  async search(bookTitle) {
    return await this.axiosBase("/search", { bookTitle: bookTitle }, "get");
  }
}

export default new BookService();
