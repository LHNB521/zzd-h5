<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '详情',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden content">
    <view class="list">
      <DescriptionList :data="dataList" />
    </view>

    <view class="map-box">
      <text class="text">地块位置</text>

      <!-- 地图操作 -->
      <view class="operation">
        <img class="xmzxc" src="/static/images/reduce.png" @click="() => setZoom(-1)" />
        <img class="xmzxc" src="/static/images/add.png" @click="() => setZoom(1)" />
        <img class="xmzxc" src="/static/images/position_bt.png" @click="onMapPoint" />
      </view>

      <view class="map" id="map"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import OlMap from '@/utils/map/index'
import { useDict } from '@/utils/common'
import { createVectorLayer } from '@/utils/map/createVectorLayer'
import { addLayer } from '@/utils/map/addLayer'
import { fitFirstFeature } from '@/utils/map/fitFirstFeature'
import { setZoom } from '@/utils/map/setZoom'

// eslint-disable-next-line camelcase
const { survey_land_type } = toRefs<any>(useDict('survey_land_type'))
const listHeigth = ref<string>('0px')

const dataList = ref([
  {
    lable: '审批文号',
    key: 'spwh',
    value: '',
  },
  {
    lable: '行政区',
    key: 'xzq',
    value: '',
  },
  {
    lable: '项目名称',
    key: 'xmmc',
    value: '',
  },
  {
    lable: '合同编号',
    key: 'htbh',
    value: '',
  },
  {
    lable: '供应面积',
    key: 'gymj',
    value: '',
  },
  {
    lable: '出让方式',
    key: 'crfs',
    value: '',
  },
  {
    lable: '土地用途',
    key: 'tdyt',
    value: '',
  },
  {
    lable: '土地坐落',
    key: 'tdzl',
    value: '',
  },
  {
    lable: '受让人(使用权人)',
    key: 'srr',
    value: '',
  },
  {
    lable: '建筑密度',
    key: 'jzmd',
    value: '',
  },
  {
    lable: '容积率',
    key: 'rjl',
    value: '',
  },
  {
    lable: '绿化率',
    key: 'lhl',
    value: '',
  },
  {
    lable: '电子监管号',
    key: 'dzjgh',
    value: '',
  },
  {
    lable: '签订时间',
    key: 'qdrq',
    value: '',
  },
])

const geoJson = ref()
onLoad((query: any) => {
  const obj = JSON.parse(query.item)
  geoJson.value = obj.geoJson
  dataList.value.forEach((item) => {
    const key = item.key
    const value = obj[key]?.toString()
    if (key === 'ydxz') {
      // eslint-disable-next-line camelcase
      const match = survey_land_type.value.find((lv: any) => lv.value === value)
      item.value = match ? match.label : ''
    } else {
      item.value = value || ''
    }
  })
})

// 地图实例
const mapExamples = ref<any>(null)
const curLayer = ref()
const style = {
  'fill-color': 'rgba(0, 163, 255, 0.5)',
  'stroke-color': 'rgba(16, 183, 255, 1)',
  'text-fill-color': '#0f0',
}
const initMap = () => {
  curLayer.value = createVectorLayer(geoJson.value, style)
  const query = uni.createSelectorQuery().in(this)
  query
    .select('#map')
    .boundingClientRect((data: any) => {
      if (data) {
        mapExamples.value = new OlMap({
          domId: data.id,
        })
      }
    })
    .exec()
  addLayer(curLayer.value)
  fitFirstFeature(curLayer.value.getSource())
  // mapOn(forEachFeatureAtPixel)
}

const getListHeight = () => {
  // 创建选择器对象
  const query = uni.createSelectorQuery().in(this)
  // 选择我们想要的DOM元素
  query
    .select('#list')
    .boundingClientRect((data: any) => {
      if (data) {
        listHeigth.value = data.height + 'px'
      }
    })
    .exec()
}
// 定位
const onMapPoint = () => {
  fitFirstFeature(curLayer.value.getSource())
}

onMounted(() => {
  getListHeight()
  initMap()
})
onUnmounted(() => {
  mapExamples.value.clearMap()
})
</script>

<style lang="scss" scoped>
.list {
  max-height: 70vh;
  overflow-y: auto;
}

.map-box {
  position: relative;
  height: calc(100% - 10px - v-bind(listHeigth));
  padding: 0px 10px 5px 10px;

  .text {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 35px;
    color: rgba(0, 0, 0, 0.5);
    text-align: left;
  }

  .operation {
    position: absolute;
    top: 40px;
    right: 15px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 12rpx;

    .xmzxc {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }

    .xmzxc:active {
      transform: scale(1.1);
    }
  }

  .map {
    height: calc(100% - 35px);
  }
}
</style>
