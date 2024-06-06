<script setup lang="ts">
const emit = defineEmits(['refresh'])

function handleRefresh() {
  emit('refresh')
}
</script>

<template>
  <div class="w-full flex justify-end items-center gap-2">
    <el-tooltip content="刷新">
      <el-button v-throttle circle @click="handleRefresh">
        <i-mdi-refresh />
      </el-button>
    </el-tooltip>
  </div>
</template>

<style scoped></style>
