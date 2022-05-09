<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  button: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["click"]);
</script>
<template>
  <div class="h-full flex justify-between items-center text-3xl">
    {{ title }}

    <div class="70">
      <slot>
        <el-button v-if="button" type="primary" @click="emits('click')">添加</el-button>
      </slot>

    </div>
  </div>
</template>
