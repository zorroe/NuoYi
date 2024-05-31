import type { RouteRecordRaw } from "vue-router"
import menuApi from "~/api/menu"

export const usePermissionStore = defineStore(
    'permission',
    {
        state: () => ({
            authRoutes: [] as string[],
            routerTree: [] as RouteRecordRaw[]
        }),
        actions: {
            generateRouter() {
                if (this.authRoutes.length === 0) {
                    this.getAuthRoute().then(res => {
                        this.authRoutes = res as any
                        if (this.authRoutes.length === 0) {
                            // 跳转到错误页面
                            ElMessage.error("您没有访问权限")
                            useRouter().push('/error')
                        }
                        this.generateTreeData()
                    })
                }
            },
            getAuthRoute() {
                return new Promise((resolve, reject) => {
                    menuApi.getRouterApi().then(res => {
                        const data = ['index', 'system', 'system-dept', 'system-menu']
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })
                })
            },

            generateTreeData() {
                const allRoutes = JSON.parse(JSON.stringify(useRouter().options.routes))
                this.generatepName(allRoutes)
                this.routerTree = allRoutes.filter((item: any) => item.pName === "" && this.authRoutes.includes(item.name))
                this.routerTree.forEach((item: any) => {
                    this.generateChild(item, allRoutes)
                })
            },
            generateChild(root: RouteRecordRaw, list: any) {
                list.forEach((item: any) => {
                    if (item.pName === root.name && !item.meta.hidden && this.authRoutes.includes(item.name)) {
                        if (root.children) {
                            root.children.push(item)
                        } else {
                            root.children = [item]
                        }
                    }
                })
                if (root.children) {
                    root.children.forEach((item: any) => {
                        this.generateChild(item, list)
                    })
                }
            },
            generatepName(data: Readonly<RouteRecordRaw[]>) {
                data.forEach((item: any) => {
                    const paths = item.name.split("-")
                    // 截取列表从第一个到倒数第二个
                    const pName = paths.slice(0, paths.length - 1).join("-")
                    item.pName = pName
                })
            }
        }
    }
)