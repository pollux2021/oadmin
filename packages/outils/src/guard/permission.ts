import type { Router } from 'vue-router'
import type { ORouter } from '@otypes/router'
import NProgress from 'nprogress' // progress bar
import { usePermission } from '@ohooks/usePermission'
import { useUserStore } from 'pinia-store'

export interface PermissionGuardOptions {
  whiteList: string[]
  notfound: string
}

export default function setupPermissionGuard(
  router: Router,
  appRoutes: ORouter.AppRouteRecordRaw[],
  options: PermissionGuardOptions,
) {
  const { whiteList, notfound } = options
  router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore()
    const Permission = usePermission()
    const inWhiteList = whiteList.includes(to.name as string)
    const permissionsAllow: any =
      inWhiteList || (await Permission.accessRouter(to))

    // 如果为未登录则跳转到登陆
    if (permissionsAllow === '401') {
      next('/login')
    } else if (permissionsAllow) {
      next()
    } else {
      const destination =
        Permission.findFirstPermissionRoute(appRoutes, userStore.roles) ||
        notfound
      next(destination)
    }
    NProgress.done()
  })
}
