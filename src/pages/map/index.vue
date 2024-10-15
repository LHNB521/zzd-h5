<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view
    class="bg-white overflow-hidden content"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    id="map"
  ></view>

  <!-- 地图操作 -->
  <view class="operation">
    <img class="xmzxc" src="/static/images/layer.png" @click="() => (show = !show)" />
    <img class="xmzxc" src="/static/images/reduce.png" @click="setZoom(-1)" />
    <img class="xmzxc" src="/static/images/add.png" @click="setZoom(1)" />
  </view>
  <wd-popup v-model="show" position="left" custom-style="width: 250px;" closable="true">
    <view class="drawer-title">
      <text>图层列表</text>
    </view>
    <LayerListVue />
  </wd-popup>

  <wd-popup v-model="showBottom" position="bottom" closable="true">
    <view class="popup-content">
      <view class="popup-title">
        <text>地块信息</text>
      </view>
      <view class="list">
        <DescriptionList :data="dataList" />
      </view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import OlMap from '@/utils/map/index'
import { useLayerListStore, useMapStore } from '@/store'
import { mapOn } from '@/utils/map/mapOn'
import { addPoints } from '@/utils/map/addPoints'
import { flyTo } from '@/utils/map/flyTo'
import { Res, clearHighlight, forEachFeatureAtPixel } from '@/utils/map/forEachFeatureAtPixel'
import { setZoom } from '@/utils/map/setZoom'
import LayerListVue from './components/layerList.vue'
import { useDict } from '@/utils/common/index'
import { dataLandList, dataProjectList } from './data'
import DescriptionList from '@/components/DescriptionList.vue'

const mapStore = useMapStore()
const LayerStore = useLayerListStore()
// eslint-disable-next-line camelcase
const { survey_project_stage, survey_project_type, survey_land_type } = toRefs<any>(
  useDict('survey_project_stage', 'survey_project_type', 'survey_land_type'),
)
// 地图实例
const mapExamples = ref<any>(null)
const show = ref(false)
const showBottom = ref(false)
const dataList = ref()
// 获取经纬度
const getLocation = () => {
  uni.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log('当前位置的经度getLocation：' + res.longitude)
      console.log('当前位置的纬度getLocation：' + res.latitude)
      addPoints([
        {
          coordinates: [res.longitude, res.latitude],
          name: '当前位置',
          isClick: false,
        },
      ])
      flyTo([res.longitude, res.latitude])
    },
  })
}
const getLocationOfHtml = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        console.log('当前位置的经度getLocationOfHtml：' + longitude)
        console.log('当前位置的纬度getLocationOfHtml：' + latitude)
        addPoints([
          {
            coordinates: [longitude, latitude],
            name: '当前位置',
            isClick: false,
          },
        ])
        flyTo([longitude, latitude])
      },
      (error) => {
        console.error('获取位置错误: ', error)
      },
    )
  } else {
    console.error('该浏览器不支持地理定位。')
  }
}
const processDataList = (obj: Record<string, any>, list: SurveyItem[]) => {
  // eslint-disable-next-line camelcase
  const stages = survey_project_stage.value
  // eslint-disable-next-line camelcase
  const types = survey_project_type.value
  // eslint-disable-next-line camelcase
  const types2 = survey_land_type.value
  list.forEach((item: SurveyItem) => {
    const key = item.key
    const value = obj[key]?.toString()
    if (key === 'stageId') {
      const match = stages.find((lv: SurveyProjectStage) => lv.value === value)
      item.value = match ? match.label : ''
    } else if (key === 'realType') {
      const match = types.find((lv: SurveyProjectStage) => lv.value === value)
      item.value = match ? match.label : ''
    } else if (key === 'ydxz') {
      const match = types2.find((lv: SurveyProjectStage) => lv.value === value)
      item.value = match ? match.label : ''
    } else {
      item.value = value || ''
    }
  })
  dataList.value = list
}
// 地图弹窗
const openMapPopup = (res: Res): void => {
  if (res.show) {
    const { description, id } = res
    if (id === 1) processDataList(description, dataProjectList)
    if (id === 2) processDataList(description, dataLandList)
    setTimeout(() => {
      showBottom.value = true
    }, 200)
  } else {
    showBottom.value = false
  }
}

onMounted(() => {
  const query = uni.createSelectorQuery().in(this)
  query
    .select('#map')
    .boundingClientRect((data) => {
      if (data) {
        // 加载地图
        const map = new OlMap({
          domId: data.id,
        })
        mapExamples.value = mapStore.map
      }
    })
    .exec()
  // 加载业务图层
  LayerStore.setMap()
  mapOn((e: any) => forEachFeatureAtPixel(e, openMapPopup))
  getLocation()
  getLocationOfHtml()
})
</script>

<style lang="scss" scoped>
.operation {
  position: absolute;
  top: 50%;
  right: 15rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;

  .xmzxc {
    width: 31px;
    height: 31px;
    cursor: pointer;
  }

  .xmzxc:active {
    transform: scale(1.1);
  }
}

.drawer-title {
  display: flex;
  justify-content: space-between;
  padding: 10rpx 16rpx;
  font-size: 18px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
  background-color: #fff;
  border-bottom: 0.5px solid rgba(231, 231, 231, 1);
}

.popup-content {
  height: 80vh;

  .popup-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0rpx 16rpx;
    font-size: 18px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.9);
    background-color: #fff;
    border-radius: 10px 10px 0 0;
  }

  .list {
    height: calc(80vh - 40px - 50px);
    overflow-y: auto;
  }
}
</style>
