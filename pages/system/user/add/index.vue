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
  title: '新增用户',
  icon: 'i-material-symbols:person-add-outline-rounded',
  hidden: true,
})

const route = useRoute()
const router = useRouter()
</script>

<style scoped></style>
