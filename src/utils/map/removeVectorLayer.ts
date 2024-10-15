import { useMapStore } from '@/store'

// 如果你保存了渲染图斑时创建的图层引用，可以直接从地图中移除该图层
export function removeVectorLayer(layer: any) {
  const { map } = useMapStore()
  if (map && layer) {
    map.removeLayer(layer)
  }
}
