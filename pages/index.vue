<template>
  <div class="flex items-center gap-4">
    <div class="i-material-symbols:10k-outline-rounded w-1em h-1em"></div>
    <div class="font-sans">Hello World</div>
    <div class="font-sans font-bold">白日依山尽</div>
    <div class="flex items-center"></div>
  </div>
  <div>
    <NuxtLink to="/login"
      ><el-button type="primary">登陆页面 </el-button>
    </NuxtLink>
    <DarkMode />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: `首页 | ${useRuntimeConfig().public.projectName}`,
})
</script>

<style scoped></style>
