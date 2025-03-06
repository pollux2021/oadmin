import type { OApi } from '@otypes/api'
import { oaxios } from 'oaxios'

export interface LoginData {
  loginAccountName: string
  loginAccountPassword: string
  captcha: string
}

export interface LoginRes {
  userInfo: UserInfo
  token: string
  pathInfo?: {
    businessId: string
    title: string
    content: string
  }
}

export interface UserInfo {
  userId?: string
  userSex?: number
  userName?: string
  userNickName?: string
  userLoginName?: string
  userDeptName?: string
  deptUserTitle?: string
  groupIds?: string
  position?: string
  roles?: string[]
  avatar?: string
}

export function login(data: LoginData) {
  return oaxios.post<OApi.Response<LoginRes>>('/auth/user/login', data)
}

export function qwLogin(data: { authCode: string }) {
  return oaxios.post<OApi.Response<LoginRes>>(
    '/auth/user/loginByAuthCode',
    data,
  )
}
