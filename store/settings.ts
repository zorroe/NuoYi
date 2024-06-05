export const useSettingsStore = defineStore('settings', () => {
  const sideMenuCollapse = useLocalStorage('sideMenuCollapse', false)

  const toggleCollapse = () => {
    sideMenuCollapse.value = !sideMenuCollapse.value
  }

  return {
    sideMenuCollapse,
    toggleCollapse,
  }
})
