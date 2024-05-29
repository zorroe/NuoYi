<template>
  <div>
    <NuxtLink to="/login">
      <el-button type="primary"> 登陆 </el-button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '首页',
  icon: 'i-material-symbols:home-outline-rounded',
  hidden: false,
})
</script>

<style scoped></style>
