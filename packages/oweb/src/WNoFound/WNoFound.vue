<template>
  <div class="wrap">
    <img class="cover" :src="noFoundSrc" />
    <h4 class="title">{{ title }}</h4>
    <p class="subtitle">{{ subtitle }}</p>
    <div v-if="!nofund" class="footer">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import noFoundSrc from '@public/noFound.png'
interface WNoFoundProps {
  title?: string
  subtitle?: string
}
defineProps<WNoFoundProps>()
const nofund = location.hash === '#/nofund'
</script>

<style scoped lang="less">
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cover {
  width: 400px;
  margin-bottom: @space-6;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 @space-1;
  color: rgb(49, 51, 59);
  white-space: pre-wrap;
}

.subtitle {
  margin: @space-2 0 0;
  font-size: 18px;
  color: rgb(130, 132, 140);
}
.footer {
  margin-top: @space-8;
}
</style>
