import { StyleLike } from 'ol/style/Style'
import { FlatStyleLike } from 'ol/style/flat'
import { GeoJson, VectorLayer, VectorSource } from './import'

// 默认样式变量
const defaultStyle = {
  'fill-color': '#0f03',
  'stroke-color': '#0f0',
  'text-fill-color': '#0f0',
}
/**
 * 创建一个包含GeoJSON数据的矢量图层。
 * @param geoJson - GeoJSON格式的特征集合，包含要在图层中显示的几何数据。
 * @param style - 用于渲染图层中要素的样式。可以是StyleLike或FlatStyleLike类型。
 * @returns 返回一个包含指定特征的矢量图层（VectorLayer）。
 */
export function createVectorLayer(geoJson: any, style: StyleLike | FlatStyleLike = defaultStyle) {
  // 使用GeoJSON格式化对象解析特征集合。
  // 如果geoJson为null或未定义，则特征集合将为空。
  const features = geoJson ? new GeoJson().readFeatures(geoJson) : null

  // 创建矢量源并加载GeoJSON数据
  const vectorSource = new VectorSource({
    features,
  })

  // 创建并返回一个矢量图层，包含指定的特征和样式
  return new VectorLayer({
    source: vectorSource,
    style, // 应用传入或默认的样式
  })
}
