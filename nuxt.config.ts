// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
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
  modules: [
    '@unocss/nuxt',
    ['@vueuse/nuxt',
      {
        autoImports: []
      }],
    ['@element-plus/nuxt',
      {
        autoImport: [
          'ElMessage',
          'ElMessageBox',
          'ElNotification'
        ]
      }],
    ['@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore()`
          'defineStore',
        ],
      }]
  ],
  css: ['~/assets/css/global.css']
})
