<script lang="tsx">
import type { PropType } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { useAppStore } from 'pinia-store'
import { listenerRouteChange } from '@outils/route-listener'
import useMenuTree from './use-menu-tree'
import WICon from '../WICon/WICon.vue'
import type { ORouter } from '@otypes/router'

type TargetContext = '_self' | '_parent' | '_blank' | '_top'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any },
) => {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(','),
  )
}

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i',
)

export default defineComponent({
  emit: ['collapse'],
  props: {
    clientMenus: {
      type: Array as PropType<ORouter.AppRouteRecordRaw[]>,
      default: () => [],
    },
  },
  setup(props) {
    const appStore = useAppStore()
    const menuWidth = computed(() => appStore.menuWidth)
    const router = useRouter()
    const route = useRoute()
    const { menuTree } = useMenuTree({
      clientMenus: props.clientMenus,
    })

    const collapsed = computed({
      get() {
        if (appStore.device === 'desktop') return appStore.menuCollapse
        return false
      },
      set(value: boolean) {
        appStore.updateSettings({ menuCollapse: value })
      },
    })
    const openKeys = ref<string[]>([])
    const selectedKey = ref<string[]>([])

    const goto = (item: RouteRecordRaw) => {
      // Open external link
      if (regexUrl.test(item.path)) {
        openWindow(item.path)
        selectedKey.value = [item.name as string]
        return
      }

      // Eliminate external link side effects
      const { hideInMenu, activeMenu } = item.meta as RouteMeta
      if (route.name === item.name && !hideInMenu && !activeMenu) {
        selectedKey.value = [item.name as string]
        return
      }
      // Trigger router change
      router.push({
        name: item.name,
      })
    }

    const findMenuOpenKeys = (target: string): string[] => {
      const result: string[] = []

      let isFind = false
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target || item.meta?.activeMenu === target) {
          isFind = true
          result.push(...keys)
          return
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string])
          })
        }
      }
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return // Performance optimization
        backtrack(el, [el.name as string])
      })

      return result
    }

    listenerRouteChange((newRoute) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta
      if (requiresAuth && (!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys(
          (activeMenu || newRoute.name) as string,
        )
        const keySet = new Set([...menuOpenKeys, ...openKeys.value])
        openKeys.value = [...keySet]

        selectedKey.value = [
          activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
        ]
      }
    }, true)

    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon
              ? () => h(WICon as any, { icon: element?.meta?.icon })
              : null
            const node =
              element?.children && element?.children.length !== 0 ? (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    icon,
                    title: () => element?.meta?.title || '',
                  }}
                >
                  {travel(element?.children)}
                </a-sub-menu>
              ) : (
                <a-menu-item
                  key={element?.name}
                  class={{
                    actived:
                      route.name === element?.name ||
                      route.path?.includes(element?.redirect as string),
                  }}
                  v-slots={{ icon }}
                  onClick={() => goto(element)}
                >
                  {element?.meta?.title || ''}
                </a-menu-item>
              )
            nodes.push(node as never)
          })
        }
        return nodes
      }
      return travel(menuTree.value)
    }

    const setCollapse = (val: boolean) => {
      if (appStore.device === 'desktop')
        appStore.updateSettings({ menuCollapse: val })
    }

    return () => (
      <section class="layout-sider" style={{ width: `${menuWidth.value}px` }}>
        <div class={['site-slogan', collapsed.value ? 'collapsed' : '']}>
          <span class="logo" />
          {/* {!collapsed.value && <h1 class="navbar-title">锐科盛凯OA管理系统</h1>} */}
        </div>
        <div class="side-menu-wrap">
          <a-menu
            class="side-menu"
            v-model:collapsed={collapsed.value}
            v-model:open-keys={openKeys.value}
            show-collapse-button={appStore.device !== 'mobile'}
            auto-open={false}
            selected-keys={selectedKey.value}
            auto-open-selected={true}
            level-indent={34}
            style="height: 100%;width:100%;"
            onCollapse={setCollapse}
          >
            {renderSubMenu()}
          </a-menu>
        </div>
      </section>
    )
  },
})
</script>

<style lang="less" scoped>
@text-color-normal: #1f2329;
@side-color: #e4eefe;
@font-size: 15px;
@font-size-icon: 24px;
@icon-gap: 16px;

.layout-sider {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  background-size: 100%;
  border-right: 1px solid #d5e0f2;
  box-sizing: border-box;
  background-color: @side-color;
  // background-image: linear-gradient(to bottom, #cbdfff 0, #ecf0ff 100%);

  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.navbar-title {
  margin: 0;
  font-size: 16px;
}

.site-slogan {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: @web-navbar-height;
  color: @text-color-normal;
  padding: 0 @space-2;
  &.collapsed {
    padding: 0;
  }
  &.collapsed .logo {
    height: 36px;
    width: 36px;
    background-size: auto 100%;
    background-position: left;
  }
}

.logo {
  display: block;
  height: 100%;
  margin-right: @space-1;
  width: 100%;
  background-image: url('@public/logoName.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.side-menu-wrap {
  flex: 1 1 auto;
  :deep {
    .w-icon {
      font-size: @font-size-icon;
    }

    .arco-menu-collapsed .arco-menu-item {
      padding-left: 8px !important;
    }
  }
}

.side-menu {
  background-color: transparent !important;
  user-select: none;
}

:deep(.arco-menu-inner) {
  .arco-menu-item {
    color: @text-color-normal !important;
    background: transparent !important;
    border-radius: 6px !important;
    font-size: @font-size;
    transition: background-color 0.1s ease-in-out;
    &:hover .arco-menu-icon {
      color: #fff;
    }
    &:active {
      opacity: 0.9;
    }
    &:hover {
      .arco-menu-title,
      .arco-menu-icon {
        color: rgb(var(--primary-6)) !important;
        font-weight: 600;
      }
    }
  }

  .arco-menu-item .icon {
    color: @text-color-normal !important;
  }

  .arco-menu-inline-header {
    background: transparent !important;
  }

  .arco-menu-selected {
    background: transparent !important;
  }

  .actived {
    color: #fff !important;
    background: rgb(var(--primary-6)) !important;
    font-weight: 600;
    &:hover {
      .arco-menu-title,
      .arco-menu-icon {
        color: #fff !important;
      }
    }
    // background: linear-gradient(270deg, rgba(89, 155, 255, 0.5) 0%, #599bff 100%) !important;
  }

  .actived .arco-menu-icon {
    color: #fff !important;
  }

  .actived .arco-menu-title {
    color: #fff !important;
  }

  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }

  .arco-icon {
    color: @text-color-normal !important;
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }

  .arco-menu-title {
    color: @text-color-normal !important;
    transition: all 0.1s ease-in-out;
  }

  .arco-menu-icon {
    display: inline-flex;
    align-items: center;
    margin-right: @icon-gap;
    color: @text-color-normal !important;
    transition: all 0.1s ease-in-out;
  }
}
</style>
@outils/route-listener
