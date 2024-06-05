import { useUserStore } from '~/store/user'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('hasRole', {
    mounted: (el, binding) => {
      const { value } = binding
      const super_admin = 'admin'
      const roles = useUserStore().roles

      if (value && Array.isArray(value) && value.length > 0) {
        const roleFlag = value

        const hasRole = roles.some((role) => {
          return super_admin === role || roleFlag.includes(role)
        })

        if (!hasRole) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
      else {
        throw new Error(`请设置角色权限标签值`)
      }
    },
    getSSRProps(_binding, _vnode) {
      // 你可以在这里提供SSR特定的props
      return {}
    },
  })
})
