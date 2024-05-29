export const useSettingsStore = defineStore('settings', {
    state: () => ({
        'sideMenuCollapsed': useLocalStorage('sideMenuCollapsed', false),
    }),
    getters: {
        //
    },
    actions: {
        toggleCollapse() {
            this.sideMenuCollapsed = !this.sideMenuCollapsed
        }
    },
})