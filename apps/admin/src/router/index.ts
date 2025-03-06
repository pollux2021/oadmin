import { createRouter, createWebHashHistory } from 'vue-router'
import createRouteGuard from '@packages/outils/src/guard'
import { NOT_FOUND_ROUTE, REDIRECT_MAIN } from './routes/base'
import { DEFAULT_ROUTE, NOT_FOUND, WHITE_LIST } from './constants'
import { appRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: DEFAULT_ROUTE.fullPath,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/userLogin/UserLogin.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    ...(appRoutes as any),
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router, appRoutes, {
  whiteList: WHITE_LIST,
  notfound: NOT_FOUND,
})

export default router
