<template>
  <div class="w-screen h-screen flex">
    <SideMenu :is-collapse="settingStore.sideMenuCollapsed" />
    <div class="flex-1 flex flex-col">
      <NavBar/>
      <el-scrollbar class="flex-1">
        <slot />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings'

const settingStore = useSettingsStore()
</script>

<style scoped></style>
