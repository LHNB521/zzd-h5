import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map', () => {
  const map = ref(null) // 地图对象
  const tdtLayer = ref(null) // 天地图Layer
  const viewer = ref(null) // 地图viewer
  // 设置地图
  const setMap = (v: any) => {
    map.value = v
  }
  // 清楚地图
  const clearMap = () => {
    map.value = null
  }
  return {
    map,
    tdtLayer,
    viewer,
    setMap,
    clearMap,
  }
})
