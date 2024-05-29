<template>
  <!-- 侧边栏菜单 -->
  <el-scrollbar
    :wrap-style="{
      backgroundColor: '#304156',
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    }">
    <el-menu
      :collapse="isCollapse"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      class="el-menu-vertical">
      <MenuItem
        v-for="item in routes"
        :key="item.path"
        :item="item" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { generateTreeData } from '~/utils/tools'

const router = useRouter()
const routes = generateTreeData(router.options.routes)
defineProps({
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

.el-menu-vertical {
  border-right: none;
}
</style>
