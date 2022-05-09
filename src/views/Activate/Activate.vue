<script setup>
import { ref } from "vue";
const password = ref();
const passwordConfirm = ref();
const activate = () => {
  if (password.value !== passwordConfirm.value) {
    return;
  }
};
</script>
<template>
  <div class="absolute flex flex-col justify-center items-center h-screen w-screen bg-gray-50">
    <!-- <div class="bg-white/50 backdrop-filter backdrop-blur-lg h-[50vh] w-[20vw] rounded-lg shadow-lg border border-gray-600 flex items-center justify-center"> -->
    <form class="w-[294px]">
      <div class="text-center font-bold">
        <div class="text-3xl">设置密码</div>
      </div>
      <el-input class="mt-8 mb-4" v-model="password" placeholder="密码" clearable show-password />
      <el-input class="mb-8" v-model="passwordConfirm" placeholder="确认密码" clearable show-password />
      <!-- <el-input placeholder="密码" v-model="account.password" show-password /> -->
      <el-button class="w-full" type="primary" @click="activate">确定</el-button>
    </form>
    <!-- </div> -->
  </div>
</template>
