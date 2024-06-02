<template>
  <el-config-provider
    :locale="zhCn"
    :button="buttonConfig">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const buttonConfig = ref({
  autoInsertSpace: true,
})

const isDark = useDark()
function enableTransitions() {
  return (
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  )
}

provide('toggle-appearance', async () => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  // @ts-ignore
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate({
    duration: 300,
    easing: 'ease-in',
    pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
  })
})
</script>

<style scoped></style>
