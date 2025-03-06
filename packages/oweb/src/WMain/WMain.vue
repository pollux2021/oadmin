<template>
  <section class="wmain">
    <PageHeaderRender v-show="showHeader" />
    <section class="wmain-content" :style="bodyStyle">
      <section v-if="slots.toolbar">
        <section class="toolbar">
          <slot name="toolbar" />
        </section>
      </section>
      <slot />
    </section>
  </section>
</template>

<script setup lang="ts">
import WPageHeader from '../WPageHeader/WPageHeader.vue'
import type { CSSProperties } from 'vue'
import { h, useSlots } from 'vue'

interface WMainProps {
  title?: string
  showBack?: boolean
  showHeader?: boolean
  showTitle?: boolean
  description?: string
  showLayoutTab?: boolean
  routerTabs?: { title: string; routeName: string }[]
  bodyStyle?: CSSProperties
  titleSticky?: boolean
}

const props = withDefaults(defineProps<WMainProps>(), {
  title: undefined,
  showHeader: true,
  showBack: true,
  showTitle: undefined,
  description: undefined,
  showLayoutTab: true,
  routerTabs: undefined,
  bodyStyle: undefined,
  titleSticky: true,
})

const slots = useSlots()
const PageHeaderRender = h(
  WPageHeader as any,
  { ...props, sticky: props.titleSticky },
  slots,
) as any
</script>

<style scoped lang="less">
.wmain {
  position: relative;
  box-sizing: border-box;
}

.toolbar {
  margin-bottom: @space-4;
  padding: 0 0 @space-2;
  border-bottom: 1px solid #eee;
}

.wmain-content {
  padding: @space-4 @space-8;
  box-sizing: border-box;
  width: 100%;
}
</style>
