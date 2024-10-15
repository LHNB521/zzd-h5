<template>
  <view class="description-list" v-for="item in data" :key="item.lable">
    <view v-if="borderTop" class="border-top">66</view>
    <wd-cell :title="item.lable" :value="item.value" />
    <view v-if="borderBottom" class="border-bottom"></view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  borderTop: {
    type: Boolean,
    default: false,
  },
  borderBottom: {
    type: Boolean,
    default: true,
  },
  data: {
    default: [],
  },
})
</script>

<style lang="scss" scoped>
.description-list {
  position: relative;
}
:deep(.wd-cell__title) {
  font-size: 16px;
  color: #3b4144;
}
:deep(.wd-cell__value) {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  color: #999;
}

.border-top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: 1px;
  background-color: #e5e5e5;
  transform: scaleY(0.5);
}

.border-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background-color: #e5e5e5;
  transform: scaleY(0.5);
}
</style>
