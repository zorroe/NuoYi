<script setup lang="ts"></script>

<template>
  <div class="w-screen h-screen flex">
    <SideMenu />
    <div class="flex-1 flex flex-col">
      <NavBar />
      <el-scrollbar class="flex-1">
        <div class="w-96% mx-auto py-2">
          <slot />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped></style>
