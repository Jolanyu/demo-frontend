<template>
  <TableLayout>
    <template #header>
      <page-head title="管理员" @click="handleCreate"></page-head>
    </template>
    <template #body>
      <div class="">
        <el-table :data="adminData" class="">
          <el-table-column prop="adminId" label="ID" width="100" align="center" />
          <el-table-column prop="adminName" label="姓名" width="130" align="center" />
          <el-table-column label="角色" width="160" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.adminRole == 1">管理员</el-tag>
              <el-tag type="success" v-else>高级管理员</el-tag>
            </template>
          </el-table-column>
          <el-table-column class="hidden" prop="createTime" label="创建时间" align="center" />
          <el-table-column prop="updateTime" label="最后更新" align="center" />
          <el-table-column align="center">
            <template #header>
              <el-input size="mini" placeholder="搜索">
                <template #prefix>
                  <el-icon class="el-input__icon">
                    <search />
                  </el-icon>
                </template>
              </el-input>
            </template>
            <template #default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template #footer>
      <el-pagination layout="prev, pager, next" :page-size="PageSize" :total="total"
        @current-change="changePage($event, getAdmin)"></el-pagination>
    </template>
  </TableLayout>

  <el-dialog :title="createAdmin ? '添加管理员信息' : '修改管理员信息'" v-model="dialogVisible" width="30%"
    @close="resetForm(formRef)">
    <el-form :model="form" label-width="60px" ref="formRef">
      <el-form-item v-if="!createAdmin" label="ID" class="w-40">
        <el-input :disabled="true" v-model="form.adminId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="adminName" :rules="rules.name">
        <el-input v-model="form.adminName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="adminRole" :rules="rules.role">
        <el-select v-model="form.adminRole">
          <el-option v-for="option in roleOptions" :label="option.label" :value="option.value"></el-option>
        </el-select>
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
import Admin from "@/service/admin.js";
import PageHead from "@/components/PageHead/PageHead.vue";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import TableLayout from "@/Layout/TableLayout.vue";
import { currentPage, changePage, getCount, total } from "../../composables/table";
import { rules, resetForm, dialogVisible, deepClone } from "../../composables/form";
const PageSize = 10;
const adminData = ref();
const roleOptions = ref([
  {
    value: 1,
    label: "管理员",
  },
  {
    value: 2,
    label: "高级管理员",
  },
]);

getCount(Admin);

const getAdmin = page => {
  Admin.getByPage(page - 1 || 0, PageSize).then(res => {
    adminData.value = res.data;
  });
};
getAdmin();

const handleDelete = (index, row) => {
  ElMessageBox.confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "danger",
  }).then(() => {
    Admin.delete(row.adminId)
      .then(res => {
        adminData.value.splice(index, 1);
        ElMessage.success("删除成功!");
      })
      .catch(err => {
        ElMessage.error("删除失败!");
      });
  });
};

const createAdmin = ref(false);
const form = ref({});
const formRef = ref(null);

const handleEdit = (index, row) => {
  createAdmin.value = false;
  form.value = deepClone(row);
  dialogVisible.value = true;
};

const handleCreate = () => {
  createAdmin.value = true;
  form.value = {};
  dialogVisible.value = true;
};

const submitForm = () => {
  formRef.value.validate(valid => {
    try {
      if (!valid) {
        return false;
      }
      const data = {
        adminName: form.value.adminName,
        adminRole: form.value.adminRole,
        gradeId: form.value.adminRole == 1 ? form.value.gradeId : null,
      };
      if (createAdmin.value) {
        Admin.create(data).then(res => {
          if (res.resultCode != 0) {
            throw new Error();
          }
          ElMessage.success("添加成功!");
          getAdmin(currentPage.value);
        });
      } else {
        Admin.update(form.value.adminId, data).then(res => {
          if (res.resultCode != 0) {
            throw new Error();
          }
          getAdmin(currentPage.value);
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

</script>
