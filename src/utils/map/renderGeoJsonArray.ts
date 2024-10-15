import { VectorSource, GeoJson, VectorLayer, Feature } from './import'
import { useMapStore } from '@/store'
import { FlatStyleLike } from 'ol/style/flat'
import { StyleLike } from 'ol/style/Style'

// 默认样式变量
const defaultStyle = {
  'fill-color': '#FF3333',
  'stroke-color': '#FF3333',
  'text-fill-color': '#0f0',
}

/**
 * 根据GeoJSON数组渲染地图图斑
 *
 * @param geoJsonArray - 包含GeoJSON对象的数组
 */
export default function renderGeoJsonArray(
  geoJsonArray: any[],
  id?: any,
  style: StyleLike | FlatStyleLike = defaultStyle,
) {
  const { map } = useMapStore() // 获取地图实例
  // 确保地图存在
  if (!map) {
    console.error('Map instance is not available.')
    return
  }

  // 创建一个矢量源并解析GeoJSON数组
  const vectorSource = new VectorSource({
    features: geoJsonArray.flatMap((item) => {
      if (!item.geoJson) {
        return [] // 如果geoJson为null，跳过这个项目
      }
      const features = new GeoJson().readFeatures(JSON.parse(item.geoJson), {
        featureProjection: map.getView().getProjection(), // 将GeoJSON坐标转换为地图的投影坐标
      })
      // 为每个特征添加名称和描述信息
      features.forEach((feature: Feature) => {
        feature.setProperties({ id, description: item })
      })
      return features
    }),
  })

  // 创建矢量图层
  return new VectorLayer({
    source: vectorSource,
    style, // 这里可以传入一个样式函数或样式对象
  })
}
