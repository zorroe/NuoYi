import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '~/utils/auth'
import { usePermissionStore } from '~/store/permission'

NProgress.configure({
  easing: 'ease-in', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.1, // 初始化时的最小百分比,
})

const whiteList = ['/login', '/register', '/error']

export default defineNuxtPlugin((_nuxtApp) => {
  // 添加你的插件逻辑
  const router = useRouter()
  router.beforeEach((to, from, next) => {
    useHead({
      title: `${to.meta.title} | ${useRuntimeConfig().public.projectName}`,
    })
    if (getToken()) {
      if (whiteList.includes(to.path)) {
        next()
        return
      }
      usePermissionStore().generateRouter()
      NProgress.start()
      next()
    }
    else {
      if (whiteList.includes(to.path)) {
        next()
      }
      else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
})
