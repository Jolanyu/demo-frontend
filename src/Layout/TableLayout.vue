<template>
  <div class="h-screen">
    <div class="h-[10vh] px-6 py-2">
      <slot name="header"></slot>
    </div>
    <slot class="h-[90vh]">
      <div class="h-[80vh] overflow-hidden p-2" ref="container">
        <slot name="body"></slot>
      </div>
      <div class="h-[10vh] flex flex-col items-center justify-center pb-6">
        <slot name="footer"></slot>
      </div>
    </slot>
  </div>
</template>
<script setup>
import { ref } from "vue";
const container = ref();
</script>
