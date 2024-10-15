import { useMapStore } from '@/store'

// 飞入指定坐标位置的函数
export const flyTo = (coordinates: number[]) => {
  const { viewer } = useMapStore()

  const duration = 200 // 飞行持续时间（毫秒）
  const zoom = 15 // 飞行结束后的缩放级别

  viewer.animate({
    center: coordinates, // 飞入中心点
    duration, // 飞行时间
  })

  // 在飞行结束时缩放
  viewer.animate({
    zoom, // 飞行后的缩放级别
    duration: duration / 2, // 缩放时间
  })
}
