<template>
  <div class="w-screen h-screen flex">
    <SideMenu />
    <div class="flex-1 flex flex-col">
      <NavBar />
      <el-scrollbar class="flex-1">
        <slot />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
