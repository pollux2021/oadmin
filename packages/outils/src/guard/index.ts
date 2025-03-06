import type { Router } from 'vue-router'
import type { ORouter } from '@otypes/router'
import { setRouteEmitter } from '../route-listener'
import setupUserLoginInfoGuard from './userLoginInfo'
import type { PermissionGuardOptions } from './permission'
import setupPermissionGuard from './permission'

function setupPageGuard(router: Router) {
  // const filesStore = useFilesStore()
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(
  router: Router,
  appRoutes: ORouter.AppRouteRecordRaw[],
  options: PermissionGuardOptions,
) {
  setupPageGuard(router)
  setupUserLoginInfoGuard(router)
  setupPermissionGuard(router, appRoutes, options)
}
