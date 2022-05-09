<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Admin from "@/service/admin.js";
import Kaptcha from "@/service/kaptcha";
import md5 from "blueimp-md5";

const account = ref({});
const router = useRouter();
const code = ref("");
const setCode = () => {
  Kaptcha.get().then(res => {
    code.value = res.data.kaptcha;
  });
};
setCode();

const login = () => {
  let Action = Admin;
  let passAccount = {};
  passAccount.id = account.value.id;
  passAccount.code = account.value.code;
  if (account.value.password !== "") {
    passAccount.password = md5(account.value.password);
  }
  Action.login(passAccount).then(res => {
    if (res.resultCode === 0) {
      console.log(res.data.token);
      let payLoad = getPayload(res.data.token);
      sessionStorage.setItem("access_token", res.data.token);
      sessionStorage.setItem("id", payLoad.id);
      sessionStorage.setItem("name", payLoad.name);
      sessionStorage.setItem("role", payLoad.role);
      if (res.data.role == "notActivated") {
        router.push("/activate");
      } else {
        router.push("/book");
      }
    }
  });
};
const getPayload = token => {
  let strings = token.split("."); //截取token，获取载体
  let payLoad = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/"))))); //解析，需要吧‘_’,'-'进行转换否则会无法解析
  return payLoad;
};
</script>

<template>
  <!-- <div class="absolute w-screen h-screen flex items-center justify-center overflow-hidden">
    <img src="../../../public/lib_cover.jpg" alt="" class="object-fill object-center" />
  </div> -->
  <div class="absolute flex flex-col justify-center items-center h-screen w-screen bg-gray-50">
    <!-- <div class="bg-white/50 backdrop-filter backdrop-blur-lg h-[50vh] w-[20vw] rounded-lg shadow-lg border border-gray-600 flex items-center justify-center"> -->
    <form class="w-[294px]">
      <div class="text-center font-bold">
        <div class="text-3xl">宁波理工附属小学</div>
        <div class="mt-2 text-2xl">图书管理系统</div>
      </div>
      <el-input class="mt-4 mb-4" v-model="account.id" placeholder="账号" clearable />
      <el-input placeholder="密码" v-model="account.password" show-password />
      <div class="mt-4 mb-8 flex justify-around w-full">
        <el-input class="mr-5" placeholder="验证码" v-model="account.code" clearable />
        <img class="rounded w-50 h-10 overflow-hidden border border-gray-300" @click="setCode"
          :src="code || 'https://clas-bucket.oss-cn-hangzhou.aliyuncs.com/uPic/JeCOgn.png'" alt="" />
      </div>
      <el-button class="w-full" type="primary" @click="login">登录</el-button>
    </form>
    <!-- </div> -->
  </div>
</template>
