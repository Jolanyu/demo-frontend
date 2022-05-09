<template>
  <el-container>
    <div class="w-[180px]">
      <el-menu class="h-screen flex flex-col justify-between overflow-hidden" :default-active="currentIndex" router>
        <div>
          <el-menu-item v-for="item in menuList" key="item.path" :index="item.path">
            <!-- <el-icon>
              <location />
            </el-icon> -->
            <span class="">{{ item.meta.title }}</span>
          </el-menu-item>
        </div>
        <div class="px-6 pb-3">
          <!-- <el-radio-group v-model="roleRadio" class="mb-4" @change="changeRole(e)">
            <el-radio label="3">schoolAdmin(2)</el-radio>
            <el-radio label="2">gradeAdmin(1)</el-radio>
            <el-radio label="1">User(0)</el-radio>
          </el-radio-group> -->
          <div class="text-lg">{{ name }}</div>
          <div class="text-lg">{{ displayedRole }}</div>
          <!-- <div v-if="role == 'user'">信用分:{{ credit }}</div> -->
          <!-- <el-tag>标签一</el-tag> -->
          <div>ID:{{ id }}</div>
          <el-button type="text" @click="logout">退出登录</el-button>
        </div>
      </el-menu>
    </div>
    <div class="h-screen w-full">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </el-container>
</template>
<script setup>
import { Location, Document, Menu as IconMenu, Setting } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import router from "@/router";
const r = useRouter();

const name = ref(sessionStorage.getItem("name"));
const role = ref(sessionStorage.getItem("role"));
const id = ref(sessionStorage.getItem("id"));
const credit = ref(sessionStorage.getItem("credit"));

const displayedRole = computed(() => {
  const roleMap = {
    highAdmin: "高级管理员",
    admin: "管理员",
  };
  return roleMap[role.value];
});
const menuList = computed(() => {
  return router.options.routes[0].children.filter(item => {
    if (!item.meta.menuIcon) return false;
    if (item.meta.roles.length == 0) return true;
    for (let i of item.meta.roles) {
      if (i == role.value) {
        return item.meta.menuIcon != null;
      }
    }
  });
});
const currentIndex = computed(() => {
  for (let i in menuList.value) {
    if ("/" + menuList.value[i].path == router.currentRoute.value.path) {
      return i;
    }
  }
});

const logout = () => {
  sessionStorage.clear();
  r.push("/login");
};
</script>
