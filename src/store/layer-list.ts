import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createScreenBaseLayer } from '../utils/map/olLayers'
import renderGeoJsonArray from '../utils/map/renderGeoJsonArray'
import { addLayer } from '../utils/map/addLayer'
import { landTransferInfo, projectList } from '@/service/index/foo'
import { removeVectorLayer } from '../utils/map/removeVectorLayer'
import { useMapStore } from './map'

export interface ICListItem {
  id: number
  title: string
  switch: boolean
  src?: string
  lyr?: any
  vectorLayer: any
}

export interface ICBaseMap {
  id: number
  title: string
  img: string
  lyr: any
  switch: boolean
  lyr2?: any
}

export const useLayerListStore = defineStore('LayerList', () => {
  const mapStore = useMapStore()
  const lyrs = createScreenBaseLayer()
  // 地图影像类型
  const mapImpactType = ref<boolean>(true) // true === 影像 false === 电子
  // 修改地图影像类型
  const setMapImpactType = (v: boolean) => {
    mapImpactType.value = v
  }

  // 地图底图选项
  const baseMapList = ref<ICBaseMap[]>([
    {
      id: 1,
      title: '影像地图',
      img: '/static/images/imageMap.png',
      lyr: lyrs[0],
      lyr2: lyrs[2],
      switch: true,
    },
    {
      id: 2,
      title: '电子地图',
      img: '/static/images/electronicMap.png',
      lyr: lyrs[1],
      switch: false,
    },
  ])

  // 修改底图
  const setBaseMapList = (v: ICBaseMap) => {
    baseMapList.value.forEach((it: ICBaseMap) => {
      if (it.id === v.id) {
        it.switch = true
        it.lyr.setVisible(true)
        it.lyr2?.setVisible(true)
      } else {
        it.switch = false
        it.lyr.setVisible(false)
        it.lyr2?.setVisible(false)
      }
      if (v.id === 1) {
        mapStore.tdtLayer.setVisible(true)
      } else {
        mapStore.tdtLayer.setVisible(false)
      }
    })
  }

  // 抽屉列表
  const listItem = ref<ICListItem[]>([
    {
      id: 1,
      title: '项目范围',
      switch: true,
      vectorLayer: null,
    },
    {
      id: 2,
      title: '出让用地',
      switch: false,
      vectorLayer: null,
    },
    {
      id: 3,
      title: '区界',
      lyr: lyrs[3],
      switch: true,
      vectorLayer: null,
    },
    {
      id: 4,
      title: '乡镇界',
      lyr: lyrs[4],
      switch: true,
      vectorLayer: null,
    },
    {
      id: 5,
      title: '永久基本农田',
      lyr: lyrs[5],
      switch: false,
      vectorLayer: null,
    },
    {
      id: 6,
      title: '生态保护红线',
      lyr: lyrs[6],
      switch: false,
      vectorLayer: null,
    },
    {
      id: 7,
      title: '核心监控区',
      lyr: lyrs[7],
      switch: false,
      vectorLayer: null,
    },
    {
      id: 8,
      title: '城镇开发边界',
      lyr: lyrs[8],
      switch: false,
      vectorLayer: null,
    },
    {
      id: 9,
      title: '滨河生态空间',
      lyr: lyrs[9],
      switch: false,
      vectorLayer: null,
    },
  ])
  // 修改抽屉列表
  const setListItem = (v: ICListItem) => {
    listItem.value.forEach((it: ICListItem) => {
      if (it.id === v.id) {
        it.switch = v.switch
      }
    })
  }

  // 加载业务图层
  const setMap = () => {
    getProjectList()
    // getLandTransferList()
    baseMapList.value.forEach((item: ICBaseMap) => {
      if (item.lyr) {
        item.lyr.setVisible(item.switch)
        addLayer(item.lyr)
      }
    })
    listItem.value.forEach((item: ICListItem) => {
      if (item.lyr) {
        item.lyr.setVisible(item.switch)
        addLayer(item.lyr)
      }
    })
  }

  // 获取指定 id 的列表项
  const findListItemById = (id: number): ICListItem | undefined => {
    return listItem.value.find((it: ICListItem) => it.id === id)
  }

  // 图层渲染
  const renderVectorLayer = (rows: any, id: number, style?: any) => {
    const item = findListItemById(id)
    if (item) {
      item.vectorLayer = renderGeoJsonArray(rows, id, style)
      addLayer(item.vectorLayer)
    }
  }

  // 图层移除
  const removeVector = (id: number): void => {
    const item = findListItemById(id)
    if (item && item.vectorLayer) {
      removeVectorLayer(item.vectorLayer)
    }
  }

  // 通用获取数据并渲染图层的函数
  const fetchAndRenderLayer = async (
    fetchFn: (query: any) => Promise<any>,
    query: any,
    id: number,
    style?: any,
  ) => {
    try {
      const res: any = await fetchFn(query)
      const { rows } = res
      if (rows) {
        renderVectorLayer(rows, id, style)
      }
    } catch (e) {
      console.error(`Failed to fetch data for layer ${id}:`, e)
    }
  }
  // 获取项目列表
  const getProjectList = async () => {
    const style = {
      'fill-color': 'rgba(255, 92, 0, 0.5)',
      'stroke-color': 'rgba(255, 92, 0, 1)',
      'text-fill-color': '#0f0',
    }
    await fetchAndRenderLayer(projectList, {}, 1, style)
  }

  // 获取出让用地列表
  const getLandTransferList = async () => {
    const style = {
      'fill-color': 'rgba(0, 163, 255, 0.5)',
      'stroke-color': 'rgba(16, 183, 255, 1)',
      'text-fill-color': '#0f0',
    }
    await fetchAndRenderLayer(landTransferInfo, {}, 2, style)
  }

  return {
    mapImpactType,
    setMapImpactType,
    listItem,
    setListItem,
    getProjectList,
    getLandTransferList,
    removeVector,
    setMap,
    baseMapList,
    setBaseMapList,
  }
})
