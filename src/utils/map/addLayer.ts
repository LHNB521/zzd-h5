import { useMapStore } from '@/store'

export function addLayer(lyr: any) {
  const { map } = useMapStore()
  map.addLayer(lyr)
}
