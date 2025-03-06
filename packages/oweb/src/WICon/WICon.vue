<template>
  <Icon v-if="icon" class="w-icon" :icon="icon" v-bind="bindAttrs" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { IconifyIcon } from '@iconify/vue'
import { Icon } from '@iconify/vue'

/**
 * 图标组件
 * - 支持iconify和本地svg图标
 * - 同时传递了icon和localIcon，localIcon会优先渲染
 */
interface Props {
  /** 图标名称 */
  icon?: string | IconifyIcon
}

defineProps<Props>()

const attrs = useAttrs()

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || '',
}))
</script>

<style scoped>
/* .w-icon {
	margin-right: 4px;
} */
</style>
