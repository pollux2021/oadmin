<template>
  <div class="wlogin-wrap">
    <div id="qrcode" />
  </div>
</template>

<script setup lang="ts">
import { useScript } from '@ohooks/useScript'
import { onMounted } from 'vue'

// 加载企微登陆sdk
const { toPromise } = useScript({
  src: 'https://wwcdn.weixin.qq.com/node/wework/wwopen/js/wwLogin-1.2.7.js',
})

const initScript = async () => {
  await toPromise()
  new (window as any).WwLogin({
    id: 'qrcode',
    appid: 'ww9df931fb0bebd07d',
    agentid: '1000077',
    redirect_uri: 'https://oa.reeko.net.cn',
  })
}

onMounted(() => {
  initScript()
})
</script>

<style lang="less" scoped>
.login-form-title {
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin: 0 0 @space-5;
  color: rgba(0, 0, 0, 0.8);
}

.wlogin-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  :deep .normalPanel {
    margin: 0 auto;
  }
}

#qrcode {
  width: 300px;
  height: 360px;
}
</style>
