<template>
  <div
    class="page-header"
    :style="{
      position: sticky ? 'sticky' : 'inherit',
      zIndex: sticky ? 90 : 0,
    }"
  >
    <!-- start -->
    <section class="start">
      <!-- title -->
      <div class="start-wrap" @click="handleTitle">
        <div class="title-desc-wrap">
          <h2
            :class="[
              'title',
              !!description || !!$slots.description ? 'hasdesc' : '',
            ]"
          >
            <WICon
              v-if="showBack"
              class="back-icon"
              icon="ic:baseline-arrow-back-ios"
            />
            <slot
              v-if="
                (showTitle && title) ||
                (!tabList.length && showTitle === undefined)
              "
              name="title"
            >
              <span class="title-text">
                {{ titleView }}
              </span>
            </slot>
          </h2>
          <div v-if="description || $slots.description" class="desc">
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </div>
      </div>
      <Tabs
        v-if="tabList.length > 0"
        :default-active-key="defaultActiveTab"
        :animation="false"
        @change="onChangeTab"
      >
        <TabPane
          v-for="item in tabList"
          :key="item.routeName"
          :title="item.title"
        />
      </Tabs>
      <slot name="start" />
    </section>

    <!-- center -->
    <section v-if="showCenter" class="center">
      <slot name="center" />
    </section>

    <!-- extra -->
    <section v-if="showExtra" class="extra">
      <slot name="extra" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TabPane, Tabs } from '@arco-design/web-vue'
import { useRoute, useRouter } from 'vue-router'
import WICon from '../WICon/WICon.vue'
import { usePermission } from '@ohooks/usePermission'
import { useAppStore } from 'pinia-store'

type RouteTabItem = { title: string; routeName: string; meta?: any }
interface WHeaderProps {
  title?: string
  description?: string
  routerTabs?: RouteTabItem[]
  showLayoutTab?: boolean
  showBack?: boolean
  showTitle?: boolean
  showExtra?: boolean
  showCenter?: boolean
  sticky?: boolean
}

const props = withDefaults(defineProps<WHeaderProps>(), {
  title: undefined,
  showBack: true,
  description: undefined,
  showLayoutTab: false,
  routerTabs: undefined,
  showExtra: true,
  showCenter: true,
  sticky: true,
})

const route = useRoute()
const router = useRouter()
const permission = usePermission()
const appStore = useAppStore()
const routes = router.getRoutes()
const defaultActiveTab = route.name as string
const serverMenu = computed(() => appStore.serverMenu)

const titleView = computed(() => {
  const { title, showLayoutTab } = props
  const curTitle = title || route.meta.title

  if (showLayoutTab) {
    const tabLayoutRouteName = route.meta.tabLayoutRouteName
    const current = routes.find((item) => item.name === tabLayoutRouteName)
    return current?.meta.title || curTitle
  }

  return curTitle
})

const tabList = computed(() => {
  if (!props.showLayoutTab) return []
  if (props.routerTabs) return props.routerTabs

  // 从路由中查找
  const tabLayoutRouteName = route.meta.tabLayoutRouteName
  const current = routes.find((item) => item.name === tabLayoutRouteName)
  const children = current?.children
  if (!children || !children.length) return []

  // 获取路由下的子菜单
  const tabs: RouteTabItem[] = []
  children.forEach((item) => {
    const meta = item.meta as any
    const rname = item.name as string
    const { title, inTabLayout, requiresAuth } = meta || {}
    const hasPermission = permission.hasPermission(
      rname,
      requiresAuth,
      serverMenu.value,
      true,
    )
    if (rname && inTabLayout && title && hasPermission) {
      tabs.push({ title, routeName: rname, meta: item.meta })
    }
  })
  return tabs
})

// 点击标题
const handleTitle = () => {
  if (props.showBack) {
    router.go(-1)
  }
}

// 切换路由tab
const onChangeTab = (routeName: any) => {
  const current = tabList.value.find((item) => item.routeName === routeName)

  router.replace({
    name: routeName,
    params: current?.meta.routeParams,
  })
}
</script>

<style lang="less" scoped>
.page-header {
  position: sticky;
  top: 0;
  height: @web-page-header-height;
  width: 100%;
  box-sizing: border-box;
  padding: 0 @space-8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  border-bottom: 1px solid var(--color-neutral-3);
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(30px);

  :deep(.arco-tabs-tab-title) {
    font-size: 18px;
    font-weight: 700;
  }
  :deep(.arco-tabs-nav::before) {
    display: none;
  }
  :deep(.arco-tabs-content) {
    display: none;
  }
  :deep(.arco-tabs-nav-tab-list) {
    margin-top: 5px;
    height: @web-page-header-height - 5px !important;
  }
  :deep(.arco-tabs-tab) {
    padding: 8px 0;
    margin: 0 @space-3;
  }
  :deep(.arco-breadcrumb) {
    height: 24px;
    overflow: hidden;
  }
}

.start {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
}

// .title-desc-wrap {
// 	line-height: 1.2;
// }

.start-wrap {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.title-text {
  margin-right: @space-4;
}

.back-icon {
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  width: 20px;
  color: var(--color-text-2);
}

.title {
  position: relative;
  margin: 0;
  display: flex;
  font-size: 18px;
  align-items: center;
  color: rgba(var(--color-text-1));
  // &.hasdesc {
  // 	margin-top: 4px;
  // }

  &:hover {
    color: rgba(var(--primary-6));
    cursor: pointer;
  }
}

.desc {
  margin: 3px 0 0;
  font-size: 14px;
  color: #999;
  width: 100%;
}

.center {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 @space-2;
}

.extra {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 30%;
}
</style>
