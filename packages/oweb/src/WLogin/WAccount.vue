<template>
  <form class="form-wrap" @submit.prevent="onSubmit">
    <div class="login-form-title"><img :src="LogoNameSrc" alt="" /></div>
    <div class="form-item form-accountName">
      <!-- <label>账号</label> -->
      <input
        v-model="loginFormData.loginAccountName"
        placeholder="手机号/邮箱"
        type="text"
      />
    </div>
    <div class="form-item form-password">
      <!-- <label>密码</label> -->
      <input
        v-model="loginFormData.loginAccountPassword"
        placeholder="请输入密码"
        type="password"
      />
    </div>
    <div class="form-item">
      <!-- <label>验证码</label> -->
      <div class="form-captcha">
        <input
          v-model="loginFormData.captcha"
          type="text"
          placeholder="请输入验证码"
        />
        <img
          placeholder="请输入"
          class="code-img"
          :src="captchaSrc"
          alt="验证码"
          @click="refreshCaptcha"
        />
      </div>
    </div>
    <div class="form-item form-login">
      <AButton
        size="large"
        type="primary"
        html-type="submit"
        long
        :loading="isLoading"
      >
        登录
      </AButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useLogin } from '@ohooks/useLogin'
import { onMounted } from 'vue'
import type { LoginRes } from '@oapis/login'
import LogoNameSrc from '@public/logoName.png'

const emit = defineEmits<{ (e: 'onSuccess', res?: LoginRes): void }>()

// 提交登录
const { captchaSrc, loginFormData, mutate, isLoading, refreshCaptcha } =
  useLogin({
    onSuccess: (res) => {
      emit('onSuccess', res)
    },
  })

onMounted(() => {
  refreshCaptcha() // 获取验证码
})

const onSubmit = (e: Event) => {
  if (!loginFormData.loginAccountName || !loginFormData.loginAccountPassword)
    return
  e.preventDefault()
  mutate()
}
</script>

<style lang="less" scoped>
.form-wrap {
  width: 100%;
}
.login-form-title {
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  margin: 0 0 @space-5;
  color: rgba(0, 0, 0, 0.8);
  img {
    display: block;
    height: 60px;
  }
}

.form-item {
  label {
    display: block;
    margin-bottom: 5px;
    color: rgba(0, 0, 0, 0.81);
    font-size: 18px;
  }

  input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    height: 38px;
    padding: @space-2 @space-4;
    border: 1px solid var(--color-border-1);
    box-sizing: border-box;
    border-radius: @rounded;
    outline: none;
    transition: all 0.2s ease-in-out;
    &:focus {
      border-color: @color-primary;
    }
  }
}

.form-password {
  margin-top: 40px;
}

.form-captcha {
  margin-top: 40px;
  display: flex;
  align-items: center;
  input {
    width: 264px;
    margin-right: 8px;
  }
  .code-img {
    display: block;
    height: 40px;
  }
}

:deep(.arco-btn-size-large) {
  margin-top: 40px;
  padding: 23px 0;
  font-size: 18px;
  border-radius: 6px;
  background: @color-primary;
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
