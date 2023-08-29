<template>
  <img ref="target" class="w-image-lazy" :src="targetSrc || EmptySrc" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import EmptySrc from '@/public/logoEmpty.png'

interface WImageLazyProps {
  src?: string
  rootMargin?: string
}
const props = withDefaults(defineProps<WImageLazyProps>(), {
  rootMargin: '400px',
  src: '',
})

const target = ref(null)
const targetSrc = ref()

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (!isIntersecting) return
    targetSrc.value = props.src
    stop()
  },
  { rootMargin: props.rootMargin },
)

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped lang="less">
.w-image-lazy {
  background-color: var(--color-fill-3);
}
</style>
