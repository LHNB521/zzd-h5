import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const windowHeight = ref<number>()
  const windowWidth = ref<number>()
  const tabbarBottomHeight = ref<number>(50) // 底部导航高度
  const renderHeight = ref<number>() // 视口高度
  const bottomHeight = ref<number>(0) // 底部安全与高度

  const sysInfo = uni.getSystemInfoSync() // 设备信息

  const setWindowHeight = () => {
    windowHeight.value = sysInfo.windowHeight // 获取设备屏幕的高度
    renderHeight.value = windowHeight.value - tabbarBottomHeight.value
  }

  const setWindowWidth = () => {
    windowWidth.value = sysInfo.windowWidth // 获取设备屏幕的宽度度
  }

  return {
    windowHeight,
    windowWidth,
    tabbarBottomHeight,
    bottomHeight,
    renderHeight,
    setWindowHeight,
    setWindowWidth,
  }
})
