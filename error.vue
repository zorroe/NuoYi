<script setup lang="ts">
useHead({
  title: '404 | Not Found',
  meta: [{ name: 'description', content: '404 | Not Found' }],
})

function handleError() {
  clearError({ redirect: '/' })
}

onMounted(() => {
})
</script>

<template>
  <div class="grid h-screen place-content-center px-4">
    <h1 class="uppercase tracking-widest">
      404 | Not Found
    </h1>
    <button @click="handleError">
      返回首页
    </button>
  </div>
</template>
