export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('hasRole', {
        mounted: (el, binding, vnode, prevVnode) => {
            const { value } = binding
            console.log("检查是否拥有权限", value)
            if (value.includes('admin')) {

            } else {
                el.parentNode && el.parentNode.removeChild(el)
            }
        },
        getSSRProps(binding, vnode) {
            // 你可以在这里提供SSR特定的props
            return {}
        }
    })  
})