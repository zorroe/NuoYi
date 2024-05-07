<template>
  <div
    class="i-material-symbols:10k-outline-rounded w-1em h-1em text-black"></div>
  <el-button
    type="primary"
    @click="handleClick"
    >测试</el-button
  >
  <div class="font-sans">Hello World</div>
  <div class="font-sans font-bold">白日依山尽</div>
</template>

<script setup lang="ts">
const handleClick = () => {
  ElMessage({
    message: 'Hello, Element Plus!',
    type: 'success',
  })
}

onMounted(() => {
  useRequest('/captchaImage', { method: 'get' }).then(res => {
    console.log(res)
  })
})
</script>

<style scoped></style>
