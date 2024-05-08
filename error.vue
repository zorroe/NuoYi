<template>
  <div class="grid h-screen place-content-center bg-white px-4">
    <h1 class="uppercase tracking-widest text-gray-500">404 | Not Found</h1>
    <button @click="handleError">返回首页</button>
  </div>
</template>
<script setup lang="ts">
const handleError = () => {
  clearError({ redirect: '/' })
}
</script>
