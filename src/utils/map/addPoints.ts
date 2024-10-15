import { useMapStore } from '@/store'
import { flyTo } from './flyTo'
import { Feature, Point, Style, VectorLayer, VectorSource } from './import'
import { Icon } from 'ol/style'

interface ICAddPoints {
  coordinates: number[]
  name: string
  isClick?: boolean
}

// 检查是否已经存在具有相同坐标的点要素
const isPointAlreadyExists = (vectorSource: VectorSource, coordinates: number[]): boolean => {
  let exists = false
  vectorSource.forEachFeature((feature) => {
    const geometry = feature.getGeometry() as Point
    const featureCoords = geometry.getCoordinates()
    // 检查是否有相同的坐标
    if (featureCoords[0] === coordinates[0] && featureCoords[1] === coordinates[1]) {
      exists = true
    }
  })
  return exists
}

// 添加点要素的函数
export const addPoints = (points: ICAddPoints[]) => {
  const { map } = useMapStore()
  // 创建矢量源，用于存储点要素
  const vectorSource = new VectorSource()

  // 遍历点数据，创建 Feature 并添加到矢量源中
  points.forEach((point: ICAddPoints) => {
    // 如果该点的坐标已经存在，跳过此点的添加
    if (isPointAlreadyExists(vectorSource, point.coordinates)) {
      console.log(`跳过已经存在的点: ${point.name}`)
      return
    }

    const pointFeature = new Feature({
      geometry: new Point(point.coordinates), // 使用经纬度坐标
      name: point.name, // 点名称
      isClick: point.isClick,
    })

    // 定义点的样式
    const pointStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 使用自定义的图标
        scale: 0.05, // 调整图标大小
      }),
    })

    // 设置样式
    pointFeature.setStyle(pointStyle)
    // 添加点要素到矢量源
    vectorSource.addFeature(pointFeature)
  })

  // 创建矢量图层
  const vectorLayer = new VectorLayer({
    source: vectorSource, // 设置矢量源
  })

  // 将矢量图层添加到地图
  map.addLayer(vectorLayer)

  // 飞入第一个点
  if (points.length > 0) {
    flyTo(points[0].coordinates)
  }
}
