import { Extent, Project, TileLayer, WMTS, WMTSTileGrid } from './import'
import mapUrls from './mapUrls'

export function createScreenBaseLayer() {
  const mapLayerUrls = [
    'zj-img',
    'zj-emap',
    'zj-emaplab',
    'nx-qj',
    'nx-xz',
    'nx-yjjbnt',
    'nx-stbhhx',
    'nx-hxjkq',
    'nx-czkfqbj',
    'nx-hbstkj',
  ]
  return mapLayerUrls.map((urlKey) => createZJZWLayer(mapUrls[urlKey]))
}

export function wmtsTileGrid() {
  const projectionExtent = Project.get('EPSG:4326').getExtent() // web墨卡托投影坐标系的四至范围
  if (!projectionExtent) {
    throw new Error('无法确定投影范围。')
  }

  const resolutions = [] // 瓦片地图分辨率
  const matrixIds = []
  const width = Extent.getWidth(projectionExtent) // web墨卡托投影坐标系的水平宽度，单位米

  for (let z = 0; z < 19; z++) {
    resolutions[z] = width / (256 * Math.pow(2, z))
    matrixIds[z] = z.toString()
  }

  return new WMTSTileGrid({
    origin: Extent.getTopLeft(projectionExtent), // 原点（左上角）
    resolutions, // 瓦片分辨率
    matrixIds, // 矩阵ID，就是瓦片坐标系z维度各个层级的标识
  })
}

// 创建 WMTS 图层
export function createZJZWLayer(url: string) {
  return new TileLayer({
    source: new WMTS({
      url,
      layer: 'imgmap',
      matrixSet: 'esritilematirx',
      format: 'image/jpgpng',
      projection: Project.get('EPSG:4326'),
      style: 'default',
      wrapX: true,
      tileGrid: wmtsTileGrid(),
    }),
  })
}

// 创建 天地图 WMTS 图层
export function createTDTLayer() {
  return new TileLayer({
    source: new WMTS({
      url: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=397cffd9753bbc7d1a5c5ab9be1a986b', // WMTS服务的URL
      layer: 'img', // 图层名
      matrixSet: 'c', // 使用的坐标系
      format: 'tiles', // 图片格式
      projection: Project.get('EPSG:4326'),
      requestEncoding: 'KVP',
      style: 'default', // 图层风格，默认值
      tileGrid: wmtsTileGrid(), // 投影坐标系
    }),
  })
}
