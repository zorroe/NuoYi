<script setup lang="ts">
import { useSettingsStore } from '~/store/settings'
import { useUserStore } from '~/store/user'

const settingStore = useSettingsStore()

const router = useRouter()
const matchRoute = router.currentRoute
const avatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png ')

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

function handleCommand(command: string) {
  console.log(command)
  if (command === 'logout') {
    useUserStore().logout()
  }
}
</script>

<template>
  <div class="h-12 bg-gray-200 flex items-center px-2 cursor-default gap-2">
    <div
      v-if="settingStore.sideMenuCollapse"
      class="p-2 content-center hover:bg-gray-300 rounded-md"
      @click="settingStore.toggleCollapse()"
    >
      <div
        class="i-mdi:arrow-expand-right w-1em h-1em"
      />
    </div>
    <div
      v-else
      class="p-2 content-center hover:bg-gray-300 rounded-md"
      @click="settingStore.toggleCollapse()"
    >
      <div
        class="i-mdi:arrow-expand-left w-1em h-1em"
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
    <div class="flex-1" />
    <el-dropdown @command="handleCommand">
      <el-avatar :src="avatar" fit="scale" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">
            <div class="flex items-center gap-1">
              <i-mdi-logout />
              <span>退出登录</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped></style>
