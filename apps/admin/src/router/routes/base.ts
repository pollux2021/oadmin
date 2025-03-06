import type { ORouter } from '@otypes/router'
import { REDIRECT_ROUTE_NAME } from '../constants'

export const DEFAULT_LAYOUT = () => import('@/layout/LayoutEntry.vue')
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
      component: () => import('@/views/redirect/RedirectTo.vue'),
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
  component: () => import('@/views/pageWrong/NotFound.vue'),
}
