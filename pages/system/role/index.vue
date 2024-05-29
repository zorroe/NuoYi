<template>
  <div>角色管理</div>
  <div>
    {{ router }}
  </div>
</template>

<script setup lang="ts">
 definePageMeta({
  title: '角色管理',
  icon: 'i-material-symbols:patient-list-outline-rounded',
})

const router = useRouter()
</script>

<style scoped></style>
