import { DEFAULT_LAYOUT } from '../base'
import type { ORouter } from 'oa'

const GOODS: ORouter.AppRouteRecordRaw[] = [
  {
    path: '/workspace',
    name: 'workspace',
    component: DEFAULT_LAYOUT,
    redirect: '/workspace/dashboard',
    meta: {
      title: '工作台',
      requiresAuth: false,
      icon: 'ic:round-dashboard',
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'workspace.dashboard',
        component: () => import('@app/demo/src/views/workSpace/DashBoard.vue'),
        meta: {
          title: '工作台',
          requiresAuth: false,
          icon: 'ic:round-dashboard',
        },
      },
    ],
  },
]

export default GOODS
