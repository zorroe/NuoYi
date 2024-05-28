import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { useUserStore } from '~/store/user';
import { isRelogin } from '~/composables/useRequest';
import loginApi from '~/api/login';

NProgress.configure({
    easing: 'ease-in', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.1,// 初始化时的最小百分比,
});

const whiteList = ['/login', '/register'];

export default defineNuxtPlugin((nuxtApp) => {
    // 添加你的插件逻辑
    const router = useRouter()

    router.beforeEach((to, from, next) => {
        NProgress.start()
        if (getToken()) {
            to.meta.title && console.log(to.meta.title)
            if (to.path === '/login') {
                next({ path: '/' })
                NProgress.done()
            } else if (whiteList.indexOf(to.path) !== -1) {
                next()
            } else {
                next()
            }
        } else {
            next()
            // if (whiteList.indexOf(to.path) !== -1) {
            //     // 在免登录白名单，直接进入
            //     next()
            // } else {
            //     next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
            //     NProgress.done()
            // }
        }
    })

    router.afterEach(() => {
        NProgress.done()
    })
})