// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    ['@vueuse/nuxt',
      {
        autoImports: []
      }],
    ['@element-plus/nuxt',
      {
        autoImport: [
          'ElMessage'
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
