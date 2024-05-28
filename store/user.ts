import { getToken, removeToken, setToken } from "~/utils/auth"
import loginApi from '~/api/login'
import defAva from '@/assets/images/avatar.png'

export const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            token: getToken(),
            id: '',
            name: '',
            avatar: '',
            roles: [] as string[],
            permissions: [] as string[]
        }),
        actions: {
            // 登录
            login(userInfo: any) {
                const username = userInfo.username.trim()
                const password = userInfo.password
                const code = userInfo.code
                const uuid = userInfo.uuid
                return new Promise((resolve, reject) => {
                    loginApi.loginApi({ username, password, code, uuid }).then(res => {
                        setToken(res.token)
                        this.token = res.token
                        resolve(res)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            // 获取用户信息
            getInfo() {
                return new Promise((resolve, reject) => {
                    loginApi.getInfoApi().then(res => {
                        const user = res.user
                        const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.URL_PREFIX + user.avatar;

                        if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                            this.roles = res.roles
                            this.permissions = res.permissions
                        } else {
                            this.roles = ['ROLE_DEFAULT']
                        }
                        this.id = user.userId
                        this.name = user.userName
                        this.avatar = avatar
                        resolve(res)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },

            logout() {
                return new Promise((resolve, reject) => {
                    loginApi.logoutApi().then(() => {
                        this.token = ''
                        this.roles = []
                        this.permissions = []
                        removeToken()
                        resolve(true)
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        }
    })