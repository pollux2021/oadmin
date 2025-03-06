import type { UserInfo } from '@oapis/login'
const TOKEN_KEY = 'token'
const USER_KEY = 'user_info'

export const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getUserInfo = (): UserInfo | null => {
  const userinfoStr = localStorage.getItem(USER_KEY)
  try {
    return JSON.parse(userinfoStr as any)
  } catch (error) {
    return null
  }
}

export const setUserInfo = (userInfo: UserInfo) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userInfo))
}

export const clearUserInfo = () => {
  localStorage.removeItem(USER_KEY)
}
