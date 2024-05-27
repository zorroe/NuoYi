<template>
  <div class="grid h-screen place-content-center px-4">
    <h1 class="uppercase tracking-widest">404 | Not Found</h1>
    <button @click="handleError">返回首页</button>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: `404 | ${useRuntimeConfig().public.projectName}`,
})

const handleError = () => {
  clearError({ redirect: '/' })
}

onMounted(() => {
  ElMessage.warning('如无操作，将在3秒后自动返回首页')
  setTimeout(() => {
    handleError()
  }, 3000)
})
</script>
