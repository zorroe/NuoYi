<template>
  <div class="h-12 bg-gray-200">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div>{{ route }}</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const levelList = ref<any>([])

const getBreadcrumb = () => {
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]

}
</script>

<style scoped></style>
