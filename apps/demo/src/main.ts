import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NProgress from 'nprogress' // progress bar
import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'
import App from './App.vue'

// styles
import 'nprogress/nprogress.css'
import '@arco-design/web-vue/dist/arco.css'
import './style.css'

NProgress.configure({ showSpinner: false }) //
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  },
}

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.mount('#app')
