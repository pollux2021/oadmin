import { computed } from 'vue'
import { usePermission } from '@ohooks/usePermission'
import { cloneDeep } from 'lodash-es'
import { useAppStore } from 'pinia-store'
import type { ORouter } from '@otypes/router'

export default function useMenuTree(options: {
  clientMenus: ORouter.AppRouteRecordRaw[]
}) {
  const { clientMenus = [] } = options
  const appStore = useAppStore()
  const permission = usePermission()
  const appRoute = computed(() => clientMenus)
  const serverMenu = computed(() => appStore.serverMenu)

  const menuTree = computed(() => {
    const copyRouter = cloneDeep(appRoute.value) as ORouter.AppRouteRecordRaw[]

    // 排序
    copyRouter.sort(
      (a: ORouter.AppRouteRecordRaw, b: ORouter.AppRouteRecordRaw) => {
        return (
          ((a.meta?.order as number) || 0) - ((b.meta?.order as number) || 0)
        )
      },
    )

    function travel(routes: ORouter.AppRouteRecordRaw[], layer: number) {
      if (!routes) return null

      const _routes = routes.filter((item) => !item.meta?.hideInMenu)

      const collector: any = _routes.map((element) => {
        const allowPermisson = permission.hasPermission(
          element.name as string,
          element.meta?.requiresAuth,
          serverMenu.value,
        )

        // no access
        if (!allowPermisson) {
          return null
        }

        // leaf node
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = []
          return element
        }

        // route filter hideInMenu true
        element.children = element.children.filter(
          (x) => x.meta?.hideInMenu !== true,
        )

        // Associated child node
        const subItem = travel(element.children, layer + 1)

        if (subItem.length) {
          element.children = subItem
          return element
        }
        // the else logic
        if (layer > 1) {
          element.children = subItem
          return element
        }

        if (element.meta?.hideInMenu === false) {
          return element
        }

        return null
      })
      return collector.filter(Boolean)
    }
    return travel(copyRouter, 0)
  })

  return {
    menuTree,
  }
}
