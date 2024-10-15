import { useMapStore } from '@/store'
import { MapBrowserEvent } from 'ol'
import { Feature, Fill, Stroke, Style } from './import'

export interface Res {
  show?: boolean
  description: Record<string, any>
  id: number
  isClick?: boolean
}

interface ICHighlightStyle {
  strokeColor: string
  strokeWidth: number
  fillColor: string
}

// 默认样式变量
const defaultStyle: ICHighlightStyle = {
  strokeColor: '#FF3333',
  strokeWidth: 2,
  fillColor: '#FF3333',
}

/**
 * 在指定的像素位置遍历所有特征，并输出相关信息。
 * @param evt - 地图浏览器事件，包含点击的位置和其他相关信息。
 */
export function forEachFeatureAtPixel(
  evt: MapBrowserEvent<any>,
  fn?: (result: Res) => void,
  highlightStyle: ICHighlightStyle = defaultStyle,
) {
  const { map } = useMapStore() // 从状态管理中获取地图实例

  // 确保map对象存在
  if (!map) {
    console.error('Map instance is not available.')
    return
  }
  // 获取点击位置的像素
  const pixel = map.getEventPixel(evt.originalEvent)
  // 获取点击位置的图斑要素（features）
  const features = map.getFeaturesAtPixel(pixel)

  if (features.length > 0) {
    // 如果点击到了图斑，触发弹窗
    const feature = features[0]
    const { isClick } = featureGetProperties(feature)
    if (!isClick && isClick !== undefined) {
      return
    }

    // 高亮图斑
    highlightFeature(feature, highlightStyle)
    const { description, id } = featureGetProperties(feature)
    fn?.({ show: true, description, id })
  } else {
    // 清除高亮
    clearHighlight()
    // 如果没有点击到图斑，关闭弹窗
    fn?.({ show: false, description: null, id: null })
  }
}

function featureGetProperties(feature: Feature): Res {
  const properties = feature.getProperties()
  // 弹窗展示的内容可以根据 properties 的内容设置
  const description = properties.description || null
  const id = properties.id || null
  const isClick = properties.isClick && true
  return { description, id, isClick }
}

// 高亮图斑
let highlightedFeature: Feature | null = null
export function highlightFeature(feature: Feature, highlightStyle: ICHighlightStyle): void {
  if (highlightedFeature) {
    // 如果之前有高亮的图斑，恢复其原始样式
    highlightedFeature.setStyle(null)
  }
  // 默认样式变量
  const style = new Style({
    stroke: new Stroke({
      color: highlightStyle.strokeColor, // 高亮边框颜色
      width: highlightStyle.strokeWidth, // 边框宽度
    }),
    fill: new Fill({
      color: highlightStyle.fillColor, // 高亮填充颜色
    }),
  })
  // 设置新的高亮样式
  feature.setStyle(style)
  highlightedFeature = feature
}

// 清除高亮
export function clearHighlight(): void {
  if (highlightedFeature) {
    highlightedFeature.setStyle(null)
    highlightedFeature = null
  }
}
