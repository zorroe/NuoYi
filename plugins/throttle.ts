export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('throttle', {
        mounted: (el, binding) => {
            el.addEventListener('click', () => {
                el.classList.add('is-disabled')
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                    el.classList.remove('is-disabled')
                }, binding.value ? binding.value : 500)//我这里设置的是2000毫秒也就是2秒
            })
        },
        getSSRProps(binding, vnode) {
            // 你可以在这里提供SSR特定的props
            return {}
        }
    })
})