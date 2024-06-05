<script setup lang="ts">
definePageMeta({
  title: '首页',
  icon: 'i-material-symbols:home-outline-rounded',
  hidden: false,
})
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
          <div>
            <el-text size="large">
              前端技术
            </el-text>
          </div>
          <el-row>
            <el-col :span="12">
              <ul>
                <li>
                  <el-link
                    href="https://nuxt.com/"
                    target="_blank"
                  >
                    Nuxt3
                  </el-link>
                </li>
                <li>
                  <el-link
                    href="https://cn.vuejs.org/"
                    target="_blank"
                  >
                    Vue3
                  </el-link>
                </li>
                <li>
                  <el-link
                    href="https://unocss.dev/"
                    target="_blank"
                  >
                    UnoCSS
                  </el-link>
                </li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>
                  <el-link
                    href="https://pinia.vuejs.org/zh/"
                    target="_blank"
                  >
                    Pinia
                  </el-link>
                </li>
                <li>
                  <el-link
                    href="https://element-plus.org/zh-CN/"
                    target="_blank"
                  >
                    ElementPlus
                  </el-link>
                </li>
                <li>
                  <el-link
                    href="https://sass-lang.com/"
                    target="_blank"
                  >
                    Sass
                  </el-link>
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
