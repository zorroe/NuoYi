<template>
  <div
    class="i-material-symbols:10k-outline-rounded w-1em h-1em text-black"></div>
  <el-button type="danger">测试</el-button>
  <el-button
    type="primary"
    @click="toggleDark()"
    >切换暗黑模式</el-button
  >
  <div class="font-sans">Hello World</div>
  <div class="font-sans font-bold">白日依山尽</div>
  <NuxtLink to="/login"
    ><el-button type="primary">登陆页面</el-button>
  </NuxtLink>
  <el-input
    ref="inputRef"
    placeholder="请输入内容" />
  <el-button
    type="primary"
    @click="inputRef?.focus()"
    v-hasPermi="['user:list']"
    v-hasRole="['superAdmin']"
    >聚焦</el-button
  >
</template>

<script setup lang="ts">
useHead({
  title: `首页 | ${useRuntimeConfig().public.projectName}`,
})

const inputRef = ref()

onMounted(() => {})

const toggleDark = useToggle(useDark())
</script>

<style scoped></style>
