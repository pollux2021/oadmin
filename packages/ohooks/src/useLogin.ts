import { onMounted, reactive, ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import type { LoginData, LoginRes } from '@oapis/login'
import { login, qwLogin as qwLogin_ } from '@oapis/login'
import { clearToken, setToken } from '@outils/auth'
import { useAppStore, useUserStore } from 'pinia-store'
import { removeRouteListener } from '@outils/route-listener'
import { sha256 } from 'js-sha256'
import { usePermission } from './usePermission'
import { getSearchObj } from '@outils/trans'

interface UseLoginOptions {
  mountedQWlogin?: boolean
  onSuccess?: (res: LoginRes) => void
  onFail?: () => void
}

const VITE_API_CAPTCHA_URL = import.meta.env.VITE_API_CAPTCHA_URL
export function useLogin(options?: UseLoginOptions) {
  const query = getSearchObj<{ code?: string }>(location.search)
  const { mountedQWlogin, onSuccess, onFail } = options || {}
  const appStore = useAppStore()
  const userStore = useUserStore()
  const { getServeMenus } = usePermission()
  const captchaSrc = ref() // 验证码图片地址

  // 登录表单
  const loginFormData = reactive<LoginData>({
    loginAccountName: '',
    loginAccountPassword: '',
    captcha: '',
  })

  // 刷新验证码
  const refreshCaptcha = () => {
    const timestamp = new Date().getTime()
    captchaSrc.value = `${VITE_API_CAPTCHA_URL}?timestamp=${timestamp}`
  }

  // 退出登录
  const logout = () => {
    clearToken()
    removeRouteListener()
    userStore.resetInfo()
    appStore.clearServerMenu()
    location.href = '/#/login'
  }

  // 登录成功
  const loginSuccess = (res: LoginRes) => {
    const { token, userInfo } = res
    setToken(token)
    userStore.setInfo(userInfo)
    getServeMenus(true)
    onSuccess && onSuccess(res)
  }

  // 登录请求
  const { isLoading, mutate } = useMutation({
    mutationKey: ['login-form'],
    mutationFn: async () => {
      const { data } = await login({
        ...loginFormData,
        loginAccountPassword:
          loginFormData.loginAccountPassword.length > 24
            ? loginFormData.loginAccountPassword
            : sha256(loginFormData.loginAccountPassword),
      })
      return data.data
    },
    onSuccess: loginSuccess,
    onError: () => {
      refreshCaptcha()
      onFail && onFail()
    },
  })

  // 企业微信登录
  const { isLoading: qwLoading, mutate: qwLogin } = useMutation({
    mutationKey: ['login-qywx'],
    mutationFn: qwLogin_,
    onSuccess: (res) => {
      loginSuccess(res.data.data)
    },
  })

  onMounted(() => {
    const code = query?.code
    if (mountedQWlogin && code) {
      qwLogin({ authCode: code })
    }
  })

  return {
    loginFormData,
    isLoading,
    mutate,
    refreshCaptcha,
    captchaSrc,
    logout,
    qwLoading,
  }
}
