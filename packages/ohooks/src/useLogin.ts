import { onMounted, reactive, ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import type { LoginData, LoginRes } from '@oapis/login'
import { login, wloginyCode } from '@oapis/login'
import { API_PREFIX } from '@oconfig/constants'
import { clearToken, setToken } from '@packages/outils/src/auth'
import { useAppStore, useUserStore } from 'pinia-store'
import { removeRouteListener } from '@packages/outils/src/route-listener'
import { sha256 } from 'js-sha256'
import { usePermission } from './usePermission'
import { getSearchObj } from '@packages/outils/src/trans'

interface UseLoginOptions {
  mountedQWlogin?: boolean
  onSuccess?: (res: LoginRes) => void
  onFalid?: () => void
}

export function useLogin(options?: UseLoginOptions) {
  const query = getSearchObj<{ code?: string }>(location.search)
  const { mountedQWlogin, onSuccess, onFalid } = options || {}
  const appStore = useAppStore()
  const userStore = useUserStore()
  const { getServeMenus } = usePermission()
  const kaptchaSrc = ref() // 验证码图片地址

  // 登录表单
  const loginFormData = reactive<LoginData>({
    loginAccountName: '',
    loginAccountPassword: '',
    captcha: '',
  })

  // 刷新验证码
  const refreshKaptcha = () => {
    const timestamp = new Date().getTime()
    kaptchaSrc.value = `${API_PREFIX}/reeko_auth/auth/kaptcha/init?timestamp=${timestamp}`
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
      refreshKaptcha()
      onFalid && onFalid()
    },
  })

  // 企业微信登录
  const { isLoading: qwLoading, mutate: qwLogin } = useMutation({
    mutationKey: ['login-qywx'],
    mutationFn: wloginyCode,
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
    refreshKaptcha,
    kaptchaSrc,
    logout,
    qwLoading,
  }
}
