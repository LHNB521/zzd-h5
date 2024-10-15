import { useMapStore } from '@/store'
import 'ol/ol.css'
import { Map } from 'ol'
import { View, defaults } from './import'
import { createTDTLayer } from './olLayers'

const mapStore = useMapStore()

interface propIC {
  domId: HTMLElement
}

export default class OlMap {
  // 传入dom
  domId: HTMLElement

  constructor(props: propIC) {
    this.domId = props.domId
    if (this.domId) {
      this.initMap()
    }
  }

  // 初始化地图
  initMap() {
    mapStore.tdtLayer = createTDTLayer()
    mapStore.viewer = new View({
      projection: 'EPSG:4326',
      center: [120.42, 30.85],
      zoom: 13,
      minZoom: 7,
      maxZoom: 18,
    })
    const map = new Map({
      target: this.domId,
      controls: defaults({
        attribution: false,
        rotate: false,
        zoom: false,
      }),
      layers: [mapStore.tdtLayer],
      view: mapStore.viewer,
    })
    mapStore.setMap(map)
  }

  clearMap() {
    mapStore.clearMap()
  }
}
