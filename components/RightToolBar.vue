<template>
    <div class="w-full flex justify-end items-center gap-2">
        <el-tooltip content="刷新">
            <el-button circle :icon="Refresh"></el-button>
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';

</script>

<style scoped></style>