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
  <NuxtLink to="/login"
    ><el-button type="primary">登陆页面</el-button>
  </NuxtLink>
</template>

<script setup lang="ts">
const handleClick = async () => {
  const res = await useGet('/prod-api/captchaImage', { timestamp: Date.now() })
  console.log(res)
}
</script>

<style scoped></style>
