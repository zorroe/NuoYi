<template>
  <div>
    {{ router }}
  </div>
  <el-divider />
  <div>
    {{ route }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '系统管理',
  icon: 'i-material-symbols:account-tree-outline-rounded',
  hidden: false,
})

const route = useRoute()
const router = useRouter()
</script>

<style scoped></style>
