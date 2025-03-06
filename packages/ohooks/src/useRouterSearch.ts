import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from 'pinia-store'

export type SearchMenuItem = {
  title: string
  icon: string
  path: string
  name: string
}
export default function useRouterSearch() {
  const router = useRouter()
  const appStore = useAppStore()
  const routes = router.getRoutes()
  const serverMenu = computed(() => appStore.serverMenu)

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

  const routersHasPermission = computed(() => {
    return routes.filter((item) => {
      const { meta = {}, name } = item
      const { requiresAuth, canSearch } = meta as any
      return (
        canSearch &&
        hasPermission(name as string, requiresAuth, serverMenu.value, true)
      )
    })
  })

  const getMenusByName = (name: string, allowEmpty?: boolean) => {
    if (!allowEmpty && !name.trim()) return []
    const menus: SearchMenuItem[] = []
    routersHasPermission.value.forEach((item) => {
      const meta = item.meta as any
      const title = meta.searchTitle || meta.title
      const isCur = title && title.search(name) !== -1
      if (isCur) {
        menus.push({
          title,
          icon: meta.icon,
          path: item.path,
          name: item.name as string,
        })
      }
    })
    return menus
  }

  return {
    getMenusByName,
  }
}
