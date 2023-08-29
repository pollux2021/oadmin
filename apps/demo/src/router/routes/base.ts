import type { ORouter } from 'oa'
import { REDIRECT_ROUTE_NAME } from '../constants'

export const DEFAULT_LAYOUT = () =>
  import('@app/demo/src/layout/LayoutEntry.vue')
export const REDIRECT_MAIN: ORouter.AppRouteRecordRaw = {
  path: '/redirect',
  name: 'redirectWrapper',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    hideInMenu: true,
  },
  children: [
    {
      path: '/redirect/:path',
      name: REDIRECT_ROUTE_NAME,
      component: () => import('@app/demo/src/views/redirect/RedirectTo.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
}

export const NOT_FOUND_ROUTE: ORouter.AppRouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  component: () => import('@app/demo/src/views/pageWrong/NotFound.vue'),
}
