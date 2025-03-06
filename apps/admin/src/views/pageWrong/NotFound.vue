<template>
  <div class="content">
    <WNoFound
      title="看起来你迷路了,让我们另寻一条"
      subtitle="404:未找到页面或权限不够"
    >
      <AButton size="large" type="outline" @click="back">原路返回</AButton>
    </WNoFound>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const back = () => {
  // warning： Go to the node that has the permission
  router.push({ name: 'workspace.dashboard' })
}
</script>

<style scoped lang="less">
.content {
  // padding-top: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
