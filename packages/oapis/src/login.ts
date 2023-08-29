import type { OApi } from 'oa/type/api'
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
  postion?: string
  roles?: string[]
  avatar?: string
}

export function login(data: LoginData) {
  return oaxios.post<OApi.Response<LoginRes>>(
    '/reeko_auth/auth/user/login',
    data,
  )
}

export function getKaptcha() {
  return oaxios.get<Blob>('/reeko_auth/auth/kaptcha/init')
}

export function wloginyCode(data: { authCode: string }) {
  return oaxios.post<OApi.Response<LoginRes>>(
    '/reeko_auth/auth/user/loginByAuthCode',
    data,
  )
}
