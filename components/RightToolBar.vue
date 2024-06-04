<template>
    <div class="w-full flex justify-end items-center gap-2">
        <el-tooltip content="刷新">
            <el-button circle :icon="Refresh" @click="handleRefresh" v-throttle></el-button>
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';

const emit = defineEmits(['refresh'])

const handleRefresh = () => {
    emit('refresh')
}

</script>

<style scoped></style>