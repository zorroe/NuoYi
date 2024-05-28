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
</script>

<style scoped></style>
