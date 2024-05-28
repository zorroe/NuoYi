<template>
  <div class="flex items-center gap-4">
    <div class="font-sans">Hello World</div>
    <div class="font-sans font-bold">一二</div>
  </div>
  <div>
    <NuxtLink to="/login"
      ><el-button type="primary"> 登陆 </el-button>
    </NuxtLink>
    <DarkMode />
  </div>
  <el-button @click="isCollapse = !isCollapse">切换</el-button>
</template>

<script setup lang="ts">
useHead({
  title: `首页 | ${useRuntimeConfig().public.projectName}`,
})

const isCollapse = ref(false)
</script>

<style scoped></style>
