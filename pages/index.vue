<template>
  <div>
    <NuxtLink to="/login">
      <el-button type="primary"> 登陆 </el-button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: `首页 | ${useRuntimeConfig().public.projectName}`,
})

definePageMeta({
  title: '首页',
  icon: 'i-material-symbols:home-outline-rounded',
  hidden: true,
})
</script>

<style scoped></style>
