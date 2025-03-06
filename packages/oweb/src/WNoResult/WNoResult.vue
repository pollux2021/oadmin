<template>
  <div :class="['no-result', size]">
    <slot name="img">
      <img v-if="type === 'dove'" :src="emptyDove" alt="no result" />
      <img v-if="type === 'list'" :src="emptyList" alt="no result" />
      <img v-if="type === 'paper'" :src="emptyPaper" alt="no result" />
    </slot>
    <div class="title">
      <slot name="description">
        <p v-if="loading" class="desc"><Spin loading />获取数据中, 请稍后</p>
        <p v-else class="desc">{{ description }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" class="extra">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Spin } from '@arco-design/web-vue'
import emptyDove from '@public/empty/emptyDove.png'
import emptyPaper from '@public/empty/emptyPaper.png'
import emptyList from '@public/empty/emptyList.png'
import type { WNoResultProps } from './type'

const props = withDefaults(defineProps<WNoResultProps>(), {
  size: 'medium',
  description: '宇宙诞生前世界是虚无的',
  type: 'list',
})

const imgSize = computed(() => {
  const { size } = props

  if (size === 'medium') {
    return '140px'
  }

  if (size === 'mini') {
    return '90px'
  }

  if (size === 'small') {
    return '120px'
  }

  if (size === 'large') {
    return '200px'
  }

  return `${size}px`
})
</script>

<style lang="less" scoped>
.no-result {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  color: #999;
  box-sizing: border-box;
  padding: @space-3;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  img {
    width: v-bind(imgSize);
    height: v-bind(imgSize);
  }
}

.desc {
  margin: @space-1 0 0;
  display: flex;
  color: #999;
  font-size: 14px;
  font-weight: 400;
  white-space: pre-wrap;
  text-align: center;
}

.small,
.mini {
  font-size: 12px;
  .desc {
    transform: scale(0.8);
  }
}

.medium {
  font-size: 14px;
}

.large {
  font-size: 16px;
}
.extra {
  margin-top: @space-3;
}
</style>
