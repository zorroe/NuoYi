// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      projectName: '管理系统'
    }
  },
  nitro: {
    preset: 'vercel',
    devProxy: {
      '/prod-api': { target: process.env.BASE_URL, changeOrigin: true },
    },
  },
  // 该配置用于服务端请求转发
  routeRules: {
    '/prod-api/**': {
      proxy: process.env.BASE_URL + '/**',
    }
  },
  devtools: { enabled: false },
  css: ['~/assets/css/global.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/sass/element.scss" as *;`,
        },
      },
    },
  },
  elementPlus: {
    importStyle: 'scss',
  },
  modules: [
    '@unocss/nuxt',
    '@element-plus/nuxt',
    ['@vueuse/nuxt',
      {
        autoImports: []
      }],
    ['@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
        ],
      }]
  ],
})
