<template>
  <section class="layout">
    <LayoutMenu v-show="!hideMenu" :client-menus="clientMenus" />
    <div class="content" :style="paddingStyle">
      <section class="layout-main">
        <LayoutNavbar
          :scroller-y="y"
          :fixed="layoutNavbarFix"
          :left="menuWidth"
          :layout-type="layoutType"
        />
        <section class="layout-content">
          <slot>
            <RouterView />
          </slot>
        </section>
      </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore, useUserStore } from 'pinia-store'
import { usePermission } from '@ohooks/usePermission'
import LayoutMenu from '../LayoutMenu/LayoutMenu.vue'
import LayoutNavbar from '../LayoutNavbar/LayoutNavbar.vue'
import { useWindowScroll } from '@vueuse/core'
import { listenerRouteChange } from '@outils/route-listener'
import type { ORouter } from '@otypes/router'

const { y } = useWindowScroll()
const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const sideMenuVisible = ref(false)
const layoutNavbarFix = computed(() => route.meta.layoutNavbarFix)
const permission = usePermission()
// const navbar = computed(() => appStore.navbar)
const hideMenu = computed(() => appStore.hideMenu)
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth
})

defineProps<{
  clientMenus: ORouter.AppRouteRecordRaw[]
  layoutType?: 'admin' | 'web'
}>()

const paddingStyle = computed(() => {
  const paddingLeft = !hideMenu.value
    ? { paddingLeft: `${menuWidth.value}px` }
    : {}
  // const paddingTop = navbar.value ? { paddingTop: `${navbarHeight}px` } : {}
  return { ...paddingLeft }
})

watch(
  () => userStore.roles,
  (roleValue) => {
    if (roleValue && !permission.accessRouter(route))
      router.push({ name: 'notFound' })
  },
)
const drawerVisible = ref(false)
provide('toggleDrawerMenu', () => {
  drawerVisible.value = !drawerVisible.value
})

// const setSideMenuLocal = (status: 'visible' | 'hide') => {
//   localStorage.setItem('side-icon-visible', status)
// }

const getSideMenuLocal = (): null | 'visible' | 'hide' => {
  return localStorage.getItem('side-icon-visible') as any
}

// const onChangeSideMenu = (visible: boolean) => {
//   sideMenuVisible.value = visible
//   setSideMenuLocal(visible ? 'visible' : 'hide')
// }

listenerRouteChange((newRoute) => {
  const { layoutMenuCollapse, hideSideIcons } = newRoute.meta
  const localSideMenuVisible = getSideMenuLocal()
  appStore.updateSettings({ menuCollapse: !!layoutMenuCollapse })
  sideMenuVisible.value =
    hideSideIcons === false
      ? true
      : !hideSideIcons &&
        (!localSideMenuVisible || localSideMenuVisible === 'visible')
}, true)
</script>

<style scoped lang="less">
@layout-max-width: 1100px;

.layout {
  width: 100vw;
  min-height: 100%;
}

.layout-main {
  position: relative;
  z-index: 100;
  // display: flex;
  flex-direction: column;
  background-color: #fff;
  background-size: 100% auto;
  // box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.06);
}

.layout-content {
  position: relative;
  flex: 1 1 auto;
  // height: 100%;
  // overflow-y: auto;
  // overflow-x: hidden;
  // border: 1px solid #f4f6fa;
}
</style>
@outils/route-listener
