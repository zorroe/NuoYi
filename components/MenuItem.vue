<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <template v-if="!item.meta.hidden">
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :route="item.path"
      :index="item.path"
    >
      <el-icon>
        <div
          :class="item.meta?.icon"
          class="w-1em h-1em"
        />
      </el-icon>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu
      v-else
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <div
            :class="item.meta?.icon"
            class="w-1em h-1em"
          />
        </el-icon>
        <span>
          {{ item.meta?.title }}
        </span>
      </template>
      <MenuItem
        v-for="(child, idx) in item.children"
        :key="idx"
        :item="child"
      />
    </el-sub-menu>
  </template>
</template>

<style scoped></style>
