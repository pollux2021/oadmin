import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useAppStore } from 'pinia-store'
import { intersection } from 'lodash-es'

export function usePermission() {
  const appStore = useAppStore()

  // 获取服务端菜单配置
  const getServeMenus = async (force?: boolean) => {
    if (force || (appStore.menuFromServer && !appStore.serverMenu.length)) {
      const result = await appStore.fetchServerMenuConfig()
      return result
    }
    return { code: '200', success: true, data: appStore.serverMenu }
  }

  // 是否拥有权限
  const hasPermission = (
    routeName: string,
    requiresAuth?: boolean,
    menuCodes?: string[],
    strict?: boolean, // 是否为严格模式
  ) => {
    const isStrict = strict === false

    // 是否拥有权限
    let allow =
      !requiresAuth ||
      (routeName &&
        menuCodes &&
        menuCodes.length > 0 &&
        menuCodes.includes(routeName))

    // 非严格模式则只要名称开头匹配则命中
    if (!isStrict && !allow && menuCodes && menuCodes.length > 0) {
      allow = !!menuCodes.find((name) => {
        return new RegExp(`^${routeName}.{0}`).test(name)
      })
    }

    return allow
  }

  const accessRouter = async (
    route: RouteLocationNormalized | RouteRecordRaw,
  ) => {
    const routeName = route.name as string // 名称
    const requiresAuth = route.meta?.requiresAuth as boolean // 必须使用权限
    // TODO: 服务端的菜单: 默认获取菜单配置
    // const { code, data } = await getServeMenus()
    // return hasPermission(routeName, requiresAuth, data || []) || code
    return hasPermission(routeName, requiresAuth, [])
  }

  return {
    getServeMenus,
    hasPermission,
    accessRouter,
    findFirstPermissionRoute(_routers: any, roles: string[] = ['admin']) {
      const cloneRouters = [..._routers]
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        const firstAuth =
          intersection(firstElement?.meta?.roles, roles).length > 0
        if (firstAuth) return { name: firstElement.name }
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children)
        }
      }
      return null
    },
  }
}
