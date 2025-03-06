<template>
  <div class="login-wrap">
    <div class="login-content">
      <span class="version">version: {{ appVersion }}</span>
      <ACarousel
        class="login-side"
        :auto-play="{ interval: 4500, hoverToPause: true }"
        indicator-type="slider"
      >
        <ACarouselItem
          v-for="(item, index) in sideBanners"
          :key="index"
          class="login-banners"
          :style="{ backgroundImage: `url(${item.imgSrc})` }"
        >
          <div class="banner-content">
            <p class="banner-title">{{ item.title }}</p>
            <p class="banner-desc">
              {{ item.desc }}
            </p>
          </div>
        </ACarouselItem>
      </ACarousel>
      <div class="login-main">
        <ATooltip
          :content="
            loginType === 'account' ? '企业微信扫码登陆' : '账号密码登陆'
          "
        >
          <span class="login-type" @click="toggleLogin">
            <WICon v-if="loginType === 'account'" icon="ic:baseline-qrcode" />
            <WICon
              v-else
              icon="material-symbols:laptop-chromebook-outline-rounded"
            />
          </span>
        </ATooltip>
        <div v-if="qwLoading" class="qw-loading">
          <ASpin :size="30" />
          企业微信登录中
        </div>
        <WAccount v-if="loginType === 'account'" @on-success="onSuccess" />
        <WQrcode v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import WICon from '../WICon/WICon.vue'
import { sideBanners } from './constants'
import WAccount from './WAccount.vue'
import WQrcode from './WQrcode.vue'
import { useLogin } from '@ohooks/useLogin'
import { useAppStore } from 'pinia-store'

const emit = defineEmits<{ (e: 'onSuccess'): void }>()
const loginType = ref<'account' | 'wwlogin'>('account')
const appStore = useAppStore()
const appVersion = computed(() => appStore.version)

const toggleLogin = () => {
  loginType.value = loginType.value === 'account' ? 'wwlogin' : 'account'
}

const onSuccess = () => {
  // Message.success('登录成功')
  emit('onSuccess')

  // 否则跳转到首页
  location.href = '/'
}

// 提交登录
const { qwLoading } = useLogin({
  mountedQWlogin: true,
  onSuccess,
})
</script>

<style lang="less" scoped>
.login-wrap {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: url(../../public/login-bg.png);
  background-repeat: repeat;
  background-size: 1000px;
  background-position: center;
  animation: bgrepeat 60s linear infinite;
}

.login-content {
  position: relative;
  display: flex;
  align-items: center;
  height: 460px;
  align-items: center;
  justify-content: center;
  margin: auto;
  position: relative;
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 6px 18px 0px rgba(0, 40, 101, 0.2);
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 0 48px 0px rgba(0, 40, 101, 0.3);
  }
}

.login-side {
  width: 530px;
  height: 100%;
  overflow: hidden;
}

.login-banners {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.banner-content {
  position: absolute;
  left: 0;
  bottom: 0;
  color: #fff;
  padding: @space-4 @space-6 @space-8;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(30px);
  overflow: hidden;
}

.banner-title {
  margin: 0 0 @space-2;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
}

.banner-desc {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  opacity: 0.7;
}

.login-main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 @space-10;
  width: 440px;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.version {
  position: absolute;
  font-size: 14px;
  top: @space-2;
  left: @space-4;
  color: #222;
  z-index: 20;
}

.login-type {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 24px;
  color: @color-primary;
  cursor: pointer;
  width: 50px;
  height: 50px;
  opacity: 0.8;
  user-select: none;
  &:hover {
    color: @color-danger;
  }
  &:active {
    opacity: 0.8;
  }
}

.qw-loading {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(18px);
  font-size: 18px;
  color: @color-primary;
  font-weight: 500;
}

@keyframes bgrepeat {
  0% {
    background-position: -900;
  }
  100% {
    background-position: 0;
  }
}
</style>
