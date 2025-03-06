import type { LocationQueryRaw, Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import { useUserStore } from 'pinia-store'
import { isLogin } from '../auth'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    if (isLogin()) {
      if (userStore.roles) {
        next()
      } else {
        try {
          await userStore.info()
          next()
        } catch (error) {
          userStore.resetInfo()
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          })
        }
      }
    } else {
      if (to.name === 'login') {
        next()
        return
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
    }
  })
}
