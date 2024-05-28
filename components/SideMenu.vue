<template>
  <!-- 侧边栏菜单 -->
  <el-menu
    :collapse="isCollapse"
    router
    class="el-menu-vertical">
    <MenuItem
      v-for="item in constantRoutes"
      :key="item.path"
      :item="item" />
  </el-menu>
</template>

<script setup lang="ts">
import { constantRoutes } from '../utils/constants'
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
