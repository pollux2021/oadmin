import type { defineComponent } from 'vue'
import type { NavigationGuard } from 'vue-router'

export declare namespace ORouter {
  export type Component<T = unknown> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<T>)

  export interface AppRouteRecordRaw {
    path: string
    name?: string | symbol
    meta?: RouteMeta
    redirect?: string
    component: Component | string
    children?: ORouter.AppRouteRecordRaw[]
    alias?: string | string[]
    props?: Record<string, unknown>
    beforeEnter?: NavigationGuard | NavigationGuard[]
    fullPath?: string
  }

  export interface RouteMeta {
    title?: string
    roles?: string[] // Controls roles that have access to the page
    requiresAuth: boolean // Whether login is required to access the current page (every route must declare)
    icon?: string // The icon show in the side menu
    hideInMenu?: boolean // If true, it is not displayed in the side menu
    hideChildrenInMenu?: boolean // if set true, the children are not displayed in the side menu
    activeMenu?: string // if set name, the menu will be highlighted according to the name you set
    order?: number // Sort routing menu items. If set key, the higher the value, the more forward it is
    ignoreCache?: boolean // if set true, the page will not be cached
    tabLayoutRouteName?: string // 指定tab布局的routeName
    layoutNavbarFix?: boolean // 显示导航条
    hideSideIcons?: boolean // 显示侧边工具按钮
    layoutMenuCollapse?: true // 显示左侧菜单
    sideMenus?: ('like' | 'collection')[]
    canSearch?: boolean // 菜单是否支持全局搜索
    searchTitle?: string // 全局搜索显示名称，不设置则使用默认title
    routeParams?: any // 额外route参数
    routeQuery?: any // 额外routeQuery参数
  }
}

declare module 'vue-router' {
  interface RouteMeta extends ORouter.RouteMeta {
    extra?: any
  }
}
