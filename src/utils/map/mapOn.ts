import { useMapStore } from '@/store'

// 地图点击事件
export function mapOn(fn?: any) {
  const { map } = useMapStore()
  fn = fn || ((e: any) => console.log(e))
  map.on('click', fn)
}
