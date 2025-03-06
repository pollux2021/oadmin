import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import type { OApi } from '@otypes/api'
import { isBlob } from '@outils/is'
import { getToken } from '@outils/auth'

const API_PREFIX = import.meta.env.VITE_API_PREFIX

const oaxios: AxiosInstance = axios.create({
  baseURL: API_PREFIX,
})

// 添加请求拦截器
oaxios.interceptors.request.use(
  (config) => {
    const token = getToken()

    // 设置token
    if (token) config.headers.Authorization = token
    config.url = config.url?.replace(new RegExp(API_PREFIX, 'g'), '')
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
oaxios.interceptors.response.use(
  (response) => {
    const data = response.data as OApi.Response | null

    // blob类型直接返回
    if (isBlob(data)) return response

    // 返回成功或不校验data.success
    const params = response.config.params || {}
    const noValid = params['$novalid']
    const isSuccess = noValid || (data && data.success)
    if (isSuccess) return response

    // 未登录则跳转到登录
    const errCode = data?.code
    const noLogin = errCode === '401' // 未登录
    if (noLogin) location.href = '#/login'

    // 未通过校验
    const isSilence = params['$silence'] // 是否不弹出错误提示
    const statusMsg = `${response.status}: ${response.statusText}`
    const errId = response?.config?.url || `${new Date().getTime()}`
    const errMsg = data?.msg || statusMsg

    // 弹出错误提示
    if (!isSilence && !noLogin) {
      Message.warning({ id: errId, content: errMsg })
    }

    // 统一axios包错返回格式
    const resError = {
      code: 'ERR_BAD_REQUEST',
      config: response?.config,
      message: errMsg,
      name: 'AxiosError',
      request: response.request,
      response,
    }

    return Promise.reject(resError)
  },
  (error) => {
    // 未登录
    const noLogin = error?.response?.status === 401
    if (noLogin) location.href = '/#/login'

    const errId = error?.config?.url || `${new Date().getTime()}`
    const errMsg = error?.message || '请求失败'

    // 提示错误
    Message.error({ id: errId, content: errMsg })
    return Promise.reject(error)
  },
)

export { oaxios }
