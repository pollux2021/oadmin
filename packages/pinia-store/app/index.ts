import { defineStore } from 'pinia'
import { defaultSettings } from './constants'
import type { AppState } from './types'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
    appDevice(state: AppState) {
      return state.device
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      const menuWidth =
        partial.menuCollapse === undefined
          ? this.menuWidth
          : partial.menuCollapse
          ? 48
          : 200
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.$patch({ menuWidth, ...partial } as any)
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    async fetchServerMenuConfig() {
      // const { data } = await getUserMenus()
      this.serverMenu = []
      return []
    },
    clearServerMenu() {
      this.serverMenu = []
    },
  },
})

export { useAppStore }
