import { defineStore } from 'pinia'
import type { UserInfo } from '@oapis/login'
import { clearUserInfo, getUserInfo, setUserInfo } from '@outils/auth'

const userInfo = getUserInfo()
const useUserStore = defineStore('user', {
  state: (): UserInfo => ({
    userId: undefined,
    userSex: 1,
    userName: undefined,
    userNickName: undefined,
    userLoginName: undefined,
    userDeptName: undefined,
    deptUserTitle: undefined,
    groupIds: undefined,
    roles: [],
    ...userInfo,
  }),

  getters: {
    userInfo(state: UserInfo): UserInfo {
      return { ...state }
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserInfo>) {
      this.$patch(partial)
      setUserInfo(partial)
    },

    // Reset user's information
    resetInfo() {
      clearUserInfo()
      this.$reset()
    },

    updateAvatar(src: string) {
      const nextData = { ...this.$state, avatar: src }
      this.avatar = src
      this.$patch(nextData)
      setUserInfo(nextData)
    },

    // Get user's information
    async info() {
      // TODO: noapi
      //  const res = await getUserInfo();
      this.setInfo({
        userId: 'test',
        userSex: 1,
        userNickName: '测试用户',
        userLoginName: '测试用户',
        userDeptName: '软件部',
        deptUserTitle: 'JAVA开发',
        groupIds: undefined,
        roles: [],
      })
    },
  },
})

export { useUserStore }
