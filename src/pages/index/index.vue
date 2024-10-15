<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view
    class="bg-image overflow-hidden px-4 h-screen"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="title"></view>
    <view class="logo"></view>
    <wd-button
      class="button"
      type="info"
      style="color: #fff; background-color: rgba(255, 255, 255, 0.4)"
      @click="handleTo"
    >
      进入程序
    </wd-button>
    <view class="footer">
      <view style="font-size: 12px">
        本服务由浙江政务服务网、湖州市自然资源和规划局南浔分局提供
      </view>
      <view>
        服务咨询线:
        <text style="color: rgba(28, 214, 255)">0572-2909865</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

function handleTo() {
  uni.switchTab({
    url: '/pages/project/index',
  })
}
// 测试 uni API 自动引入
onLoad(() => {})
</script>

<style scoped>
.bg-image {
  background-image: url('@/static/images/start_page1.png'), url('@/static/images/start_page0.png');
  background-repeat: no-repeat, no-repeat;
  background-size: cover;
}

.title {
  position: absolute;
  top: 2px;
  width: 100%;
  height: calc(23px + 16px);
  background-image: url('@/static/images/start_page_title.png');
  background-repeat: no-repeat;
  background-position: 10% 100%;
  background-size: 299px, 23px;
}

.logo {
  position: absolute;
  top: calc(50% - 20px);
  width: 100%;
  height: 168px;
  background-image: url('@/static/images/start_page_logo.png');
  background-repeat: no-repeat;
  background-size: 262px, 168px;
}

.button {
  position: absolute;
  top: calc(78% - 20px);
  left: 5%;
  width: 90%;
  font-family: Source Han Sans CN;
  font-size: 16px;
  font-weight: 500;
  border-radius: 50px;
}

.footer {
  position: absolute;
  top: calc(88% - 20px);
  right: 1%;
  left: 1%;
  font-family: Alibaba PuHuiTi;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: #fff;
  text-align: center;
}
</style>
