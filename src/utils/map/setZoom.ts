import { useMapStore } from '@/store'

export function setZoom(number = 2) {
  const { map } = useMapStore()
  map.getView().setZoom(map.getView().getZoom() + number)
}
