import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const initState = { nickname: '', avatar: '' }

type IUserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<IUserInfo>({ ...initState })

  const setUserInfo = (val: IUserInfo) => {
    userInfo.value = val
  }

  const clearUserInfo = () => {
    userInfo.value = { ...initState }
  }
  // 一般没有reset需求，不需要的可以删除
  const reset = () => {
    userInfo.value = { ...initState }
  }
  const isLogined = computed(() => !!userInfo.value.token)

  return {
    userInfo,
    setUserInfo,
    clearUserInfo,
    isLogined,
    reset,
  }
})
