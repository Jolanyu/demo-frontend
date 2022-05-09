<template>
  <div class="flex flex-col items-center justify-center bg-base-self h-screen w-screen">
    <div class="text-3xl font-bold tracking-wide">404</div>
    <div class="text-4xl font-semibold mt-1 mb-5">页面不存在</div>
    <el-button type="primary" class="btn bg-primary text-primaryContent w-20" @click="back">返回</el-button>
  </div>
</template>

<script setup>
const back = () => {
  window.history.back(-1);
  window.history.back(-1);
};
</script>

<style></style>
