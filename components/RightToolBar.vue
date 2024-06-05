<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'

const emit = defineEmits(['refresh'])

function handleRefresh() {
  emit('refresh')
}
</script>

<template>
  <div class="w-full flex justify-end items-center gap-2">
    <el-tooltip content="刷新">
      <el-button v-throttle circle :icon="Refresh" @click="handleRefresh" />
    </el-tooltip>
  </div>
</template>

<style scoped></style>
