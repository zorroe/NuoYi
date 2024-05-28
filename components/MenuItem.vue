<template>
  <template v-if="!item.hidden">
    <el-menu-item
      v-if="!item.children"
      :route="item.path"
      :index="item.path">
      <el-icon>
        <div
          :class="item.meta?.icon"
          class="w-1em h-1em"></div>
      </el-icon>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu
      v-else
      :index="item.path">
      <template #title>
        <el-icon>
          <div
            :class="item.meta?.icon"
            class="w-1em h-1em"></div>
        </el-icon>
        <span>
          {{ item.meta?.title }}
        </span></template
      >
      <MenuItem
        v-for="(child, idx) in item.children"
        :item="child"
        :key="idx" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped></style>
