<template>
  <div
    @click="toggleDark()"
    class="hover:bg-op-30 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg inline-block">
    <div
      class="i-material-symbols:sunny-outline-rounded dark:i-material-symbols:mode-night-outline-rounded w-1em h-1em m-1.5"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * Toggle dark mode
 */
const toggleDark = inject('toggle-appearance', () => {})
</script>

<style scoped></style>
