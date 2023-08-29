<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { useAppStore } from 'pinia-store'
import { version } from '../package.json'

const appStore = useAppStore()
appStore.$state.version = version
</script>

<style lang="less"></style>
