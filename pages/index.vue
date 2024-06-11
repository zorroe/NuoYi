<script setup lang="ts">
definePageMeta({
  title: '首页',
  icon: 'i-mdi:home',
  hidden: false,
})

const links = ref([
  { icon: 'i-logos-nuxt-icon', title: 'Nuxt3', href: 'https://nuxt.com/', target: '_blank' },
  { icon: 'i-logos-vue', title: 'Vue3', href: 'https://vuejs.org/', target: '_blank' },
  { icon: 'i-logos-element', title: 'Element Plus', href: 'https://element-plus.org/', target: '_blank' },
  { icon: 'i-logos-pinia', title: 'Pinia', href: 'https://pinia.vuejs.org/', target: '_blank' },
  { icon: 'i-logos-unocss', title: 'UnoCSS', href: 'https://unocss.dev/', target: '_blank' },
  { icon: 'i-logos-sass', title: 'Sass', href: 'https://sass-lang.com/', target: '_blank' },
])
</script>

<template>
  <div>
    <el-row :gutter="12">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>{{ useRuntimeConfig().public.projectName }}</span>
            </div>
          </template>
          <div>
            <el-text
              class="mx-1"
              size="large"
            >
              RuoYi with Nuxt3
            </el-text>
          </div>
          <div class="mt-2">
            <NuxtLink
              to="https://github.com/zorroe"
              target="_blank"
            >
              <el-button type="primary">
                <template #icon>
                  <div class="i-mdi:github" />
                </template>
                GitHub
              </el-button>
            </NuxtLink>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>技术选型</span>
            </div>
          </template>
          <div class="flex gap-4">
            <template v-for="(link, idx) in links" :key="idx">
              <el-tooltip :content="link.title" placement="top">
                <el-link
                  :href="link.href"
                  :target="link.target"
                >
                  <el-icon size="32">
                    <div :class="link.icon" />
                  </el-icon>
                </el-link>
              </el-tooltip>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
