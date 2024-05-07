// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  ]
})
