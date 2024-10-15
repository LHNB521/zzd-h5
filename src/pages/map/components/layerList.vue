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
  <view class="select-map">
    <view
      class="select-image"
      v-for="item in LayerStore.baseMapList"
      :key="item.id"
      @click="handleBaseMap(item)"
    >
      <image class="image" :class="item.switch ? 'is-image' : ''" :src="item.img"></image>
      <text class="text" :class="item.switch ? 'is-text' : ''">{{ item.title }}</text>
    </view>
  </view>

  <uni-list class="list">
    <uni-list-item class="item" v-for="item in LayerStore.listItem" :key="item.id">
      <template v-slot:header>
        <image class="item-image" src="/static/images/list-item-icon.png"></image>
      </template>
      <template v-slot:body>
        <text class="item-text">{{ item.title }}</text>
      </template>
      <template v-slot:footer>
        <switch
          class="item-switch"
          :checked="item.switch"
          color="rgba(1, 183, 6, 1)"
          @change="(e) => handleSwitch(e, item)"
        />
      </template>
    </uni-list-item>
  </uni-list>
</template>

<script lang="ts" setup>
import { useLayerListStore, ICListItem, ICBaseMap } from '@/store'

const LayerStore = useLayerListStore()
// 底图选择
function handleBaseMap(item: ICBaseMap) {
  if (item.switch === true) return
  LayerStore.setBaseMapList(item)
}
// 选择项目
function handleSwitch(e: any, item: ICListItem) {
  const isVisible = e.detail.value
  item.switch = isVisible
  LayerStore.setListItem(item)

  // 如果图层存在，设置可见性
  if (item.lyr) {
    item.lyr.setVisible(isVisible)
    return
  }

  // 如果图层不存在，根据可见性获取项目列表或进行其他操作
  if (isVisible) {
    item.id === 1 && LayerStore.getProjectList()
    item.id === 2 && LayerStore.getLandTransferList()
  } else {
    LayerStore.removeVector(item.id)
  }
}
</script>

<style lang="scss" scoped>
.select-map {
  position: relative;
  display: flex;
  gap: 10px;
  width: calc(100% - 40px);
  height: calc(67px + 30px);
  padding: 20px 20px 10px;
  margin-bottom: 8rpx;
  background-color: #fff;

  .select-image {
    width: 50%;
    height: 100%;
  }

  .image {
    width: calc(100% - 3px * 2);
    height: calc(67px - 3px * 2);
    border: 3px solid #fff;
  }

  .is-image {
    width: calc(100% - 3px * 2);
    height: calc(67px - 3px * 2);
    border: 3px solid rgba(1, 155, 241, 1);
  }

  .text {
    width: 100%;
    height: 30px;
    padding: 0px 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
  }

  .is-text {
    color: rgba(0, 82, 217, 1);
  }
}

.list {
  .item {
    position: relative;

    :deep(.uni-list-item__container) {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }

  .item-image {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .item-text {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
    text-align: left;
  }

  .item-switch {
    position: absolute;
    right: 0px;
    transform: scale(0.7);
  }
}
</style>
