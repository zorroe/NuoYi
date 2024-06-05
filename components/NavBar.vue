<script setup lang="ts">
import { useSettingsStore } from '~/store/settings'

const settingStore = useSettingsStore()

const router = useRouter()
const matchRoute = router.currentRoute

const breadcrumbs = computed(() => {
  const paths = matchRoute.value.name?.toString().split('-') || []
  const breadcrumbs = []
  for (let i = paths.length; i > 0; i--) {
    // 截取从0到i的路径
    const name = paths.slice(0, i).join('-')
    const find = router.options.routes.find(item => item.name === name)
    breadcrumbs.unshift(find)
  }
  return breadcrumbs
})
</script>

<template>
  <div class="h-12 bg-gray-200 flex items-center pl-2 cursor-default gap-2">
    <div
      v-if="settingStore.sideMenuCollapse"
      class="p-2 content-center hover:bg-gray-300 rounded-md"
      @click="settingStore.toggleCollapse()"
    >
      <div
        class="i-material-symbols:right-panel-close-outline-rounded w-1em h-1em"
      />
    </div>
    <div
      v-else
      class="p-2 content-center hover:bg-gray-300 rounded-md"
      @click="settingStore.toggleCollapse()"
    >
      <div
        class="i-material-symbols:right-panel-open-outline w-1em h-1em"
      />
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(breadcrumb, idx) in breadcrumbs"
        :key="idx"
      >
        {{ breadcrumb?.meta!.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped></style>
