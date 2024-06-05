import Icons from 'unplugin-icons/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      projectName: '管理系统',
    },
  },
  nitro: {
    devProxy: {
      '/prod-api': { target: process.env.BASE_URL, changeOrigin: true },
    },
  },
  // 该配置用于服务端请求转发
  routeRules: {
    '/prod-api/**': {
      proxy: `${process.env.BASE_URL}/**`,
    },
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
    plugins: [
      AutoImport({
        resolvers: [
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      Components({
        resolvers: [
          IconsResolver(),
        ],
      }),
      Icons({
        autoInstall: true,
      }),

    ],
  },
  elementPlus: {
    importStyle: 'scss',
  },
  modules: [
    '@unocss/nuxt',
    '@element-plus/nuxt',
    ['@vueuse/nuxt', {
      autoImports: [],
    }],
    ['@pinia/nuxt', {
      autoImports: [
        // 自动引入 `defineStore()`
        'defineStore',
      ],
    }],
  ],
  plugins: [
    { src: '~/plugins/router.ts', mode: 'client' },
  ],
})
