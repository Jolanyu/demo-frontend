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
  async publish(bookId) {
    return await this.axiosBase("/" + bookId + "/publish", null, "put");
  }

  async borrow(bookId) {
    return await this.axiosBase("/" + bookId + "/borrow", { bookId: bookId }, "put");
  }

  async renew(recordId) {
    return await this.axiosBase("/renew", { recordId: recordId }, "put");
  }

  async returnBook(recordId) {
    console.log(recordId);
    return await this.axiosBase("/returnBook", { recordId: recordId }, "put");
  }

  async gradeBorrow(bookId) {
    return await this.axiosBase("/" + bookId + "/gradeBorrow", { bookId: bookId }, "put");
  }

  async gradeReturn(bookId) {
    return await this.axiosBase("/" + bookId + "/gradeReturn", { bookId: bookId }, "put");
  }
}

export default new BookService();
