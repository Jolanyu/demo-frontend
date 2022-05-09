<template>
  <TableLayout>
    <template #header>
      <page-head title="书籍管理" @click="handleCreate"></page-head>
    </template>
    <template #body>
      <div class="">
        <el-table :data="bookData" class="">
          <el-table-column prop="bookId" label="BookId" width="100" align="center" />
          <el-table-column prop="bookTitle" label="书名" width="260" align="center" />
          <el-table-column prop="bookAuthor" label="作者" width="200" align="center" />
          <el-table-column prop="bookIsbn" label="Isbn" width="130" align="center" />
          <el-table-column prop="bookCategory" label="类别" width="100" align="center" />
          <el-table-column prop="bookPublisher" label="出版社" width="220" align="center" />
          <el-table-column align="center">
            <template #header>
              <el-input size="mini" placeholder="搜索书名" clearable v-model="searchInput" @blur="searchBook"
                @keydown.enter="searchBook">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <search />
                  </el-icon>
                </template>
              </el-input>
            </template>
            <template #default="scope">
              <el-button v-if="scope.row.bookStatus == 4" size="mini" @click="handlePublish(scope.$index, scope.row)">上架
              </el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template #footer>
      <el-pagination class="" layout="prev, pager, next" :page-size="PageSize" :total="total"
        v-bind:current-page="currentPage" @current-change="changePage($event, getBook)"></el-pagination>
    </template>
  </TableLayout>
  <el-dialog :title="createBook ? '添加书籍信息' : '修改书籍信息'" v-model="dialogVisible" width="30%" @close="resetForm(formRef)">
    <el-form :model="form" label-width="70px" ref="formRef">
      <el-form-item v-if="!createBook" label="BookID" class="w-40">
        <el-input :disabled="true" v-model="form.bookId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="书名" prop="bookTitle" :rules="rules.bookName">
        <el-input v-model="form.bookTitle" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="bookAuthor" :rules="rules.bookAuthor">
        <el-input v-model="form.bookAuthor" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Isbn" prop="bookIsbn" :rules="rules.bookIsbn">
        <el-input v-model="form.bookIsbn" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="bookCategory" :rules="rules.bookCategory">
        <el-input v-model="form.bookCategory" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="bookPublisher" :rules="rules.bookPublisher">
        <el-input v-model="form.bookPublisher" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(formRef)">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import Book from "@/service/book.js";
import PageHead from "@/components/PageHead/PageHead.vue";
import TableLayout from "@/Layout/TableLayout.vue";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { currentPage, changePage, getCount, total } from "../../composables/table";
import { deepClone, rules, resetForm, dialogVisible } from "../../composables/form";

let PageSize = 10;
const bookData = ref();
const searchedBooks = ref([]);
const searchInput = ref();
const coverUrl = ref();
getCount(Book);

//渲染书籍
const getBook = page => {
  if (searchedBooks.value.length) {
    let startingIndex = (page - 1) * PageSize;
    let arr = [];
    for (let i = startingIndex; i < startingIndex + PageSize && i < total.value; i++) {
      arr.push(searchedBooks.value[i]);
    }
    bookData.value = arr;
  } else {
    Book.getByPage(page - 1 || 0, PageSize).then(res => {
      bookData.value = res.data;
    });
  }
};
getBook();
//搜索
const searchBook = async () => {
  if (searchInput.value) {
    await Book.search(searchInput.value).then(res => {
      searchedBooks.value = res.data;
      total.value = res.data.length;
    });
  } else {
    currentPage.value = 1;
    searchedBooks.value = [];
    getCount(Book);
  }
  getBook(1);
};
//删除
const handleDelete = (index, row) => {
  ElMessageBox.confirm("此操作将永久删除该书, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "danger",
  }).then(() => {
    Book.delete(row.bookId)
      .then(res => {
        bookData.value.splice(index, 1);
        ElMessage.success("删除成功!");
      })
      .catch(err => {
        ElMessage.error("删除失败!");
      });
  });
};
const createBook = ref(false);
const form = ref({});
const formRef = ref(null);
//编辑
const handleEdit = (index, row) => {
  createBook.value = false;
  form.value = deepClone(row);
  console.log(form.value);
  dialogVisible.value = true;
};
//添加
const handleCreate = () => {
  createBook.value = true;
  form.value = {};
  dialogVisible.value = true;
};
//确认
const submitForm = () => {
  formRef.value.validate(valid => {
    try {
      if (!valid) {
        return false;
      }
      const data = {
        bookStatus: form.value.bookStatus,
        bookTitle: form.value.bookTitle,
        bookAuthor: form.value.bookAuthor,
        bookIsbn: form.value.bookIsbn,
        bookCategory: form.value.bookCategory,
        bookImage: coverUrl.value,
        bookPublisher: form.value.bookPublisher,
      };
      if (createBook.value) {
        Book.create(data).then(res => {
          if (res.resultCode != 0) {
            throw new Error();
          }
          ElMessage.success("添加成功!");
          getBook();
        });
      } else {
        Book.update(form.value.bookId, data).then(res => {
          if (res.resultCode != 0) {
            throw new Error();
          }
          getBook(currentPage.value);
          ElMessage.success("修改成功!");
        });
      }
      resetForm(formRef.value);
    } catch (error) {
      ElMessage.error("非法数据!");
      return false;
    }
  });
};
const handlePublish = (index, row) => {
  Book.publish(row.bookId)
    .then(res => {
      getBook();
      // bookData.value.splice(index, 1);
      ElMessage.success("发布成功!");
    })
    .catch(err => {
      ElMessage.error("发布失败!");
    });
};

// const sendImg = event => {
//   let file = event.target.files[0];
//   let param = new FormData();
//   param.append("file", file);
//   File.upload(param).then(res => {
//     coverUrl.value = res.data.url;
//   });
// };
</script>
