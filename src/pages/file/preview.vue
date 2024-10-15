<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '预览',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden content" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <wd-fab
      :expandable="false"
      type="info"
      position="right-top"
      inactiveIcon="close"
      @click="handleBack"
    ></wd-fab>
    <view id="pdf"></view>
  </view>
</template>

<script lang="ts" setup>
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'

const url = ref<string>()
const pdfH5 = ref<any>()
function handleBack() {
  pdfH5.value.destroy()
  history.back()
}
const LoadPdf = () => {
  pdfH5.value = new Pdfh5('#pdf', {
    pdfurl: url.value,
  })
}
onMounted(() => {
  LoadPdf()
})
onLoad((options: any) => {
  url.value = JSON.parse(decodeURIComponent(options.url))
})
</script>

<style lang="scss" scoped>
#pdf {
  width: 100vw;
  height: 100vh;
}
</style>
