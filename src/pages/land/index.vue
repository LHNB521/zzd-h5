<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="bg-white overflow-hidden content" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
    <wd-search
      class="search"
      v-model="searchValue"
      placeholder="输入关键词搜索"
      placeholder-left
      @change="debounceInput"
      hide-cancel
    />
    <scroll-view class="list" :scroll-y="true" @scrolltolower="handelLower">
      <CardVue class="cardVue" v-for="item in list" :key="item.id">
        <template #title>
          <view class="title">
            <text class="title-text">{{ item.xmmc }}</text>
          </view>
        </template>
        <view class="card_content">
          {{ item.dkh }}
        </view>
        <template #footer>
          <view class="footer">
            <view class="footer-left">
              <image style="width: 11px; height: 14px" src="/static/images/card_icon.png"></image>
              <text class="time">{{ item.sqzt }}</text>
            </view>
            <wd-button class="button" plain :round="false" @click="handleLook(item)">
              查看
            </wd-button>
          </view>
        </template>
      </CardVue>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup name="Land">
import { debounce } from '@/utils/common/index'
import CardVue from '@/components/Card.vue'
import { landTransferInfo } from '@/service'

const { safeAreaInsets } = uni.getSystemInfoSync()

const searchValue = ref()
const queryForm = ref({
  sqzt: '',
  param: '',
  pageNum: 1,
  pageSize: 10,
  isAsc: 'desc',
})

const list = ref([])
const total = ref(0)
const inputHandle = () => {
  queryForm.value.param = searchValue.value
  getList()
}

// 监听输入框
const debounceInput = debounce(inputHandle, 500, false)

// 获取数据列表
async function getList() {
  try {
    // const res: any = await landTransferInfo(queryForm.value)
    // list.value = res.rows
    list.value = [
      {
        id: 1,
        xmmc: '的就是看了就打算看了看就打死了',
        dkh: '的就是看了就打算看了看就打死了的就是看了就打算看了看就打死了',
        sqzt: 'sqzths',
      },
    ]
    // total.value = res.total
  } catch (e) {
    console.log(e)
  }
}

// 点击查看
function handleLook(item: any) {
  const json = JSON.stringify(item)
  uni.navigateTo({
    url: `../land/details?item=${json}`,
  })
}
// 触底加载
const handelLower = () => {
  queryForm.value.pageSize += 10
  getList()
}
onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px !important;
  padding: 0px 10px !important;
  overflow: hidden;
}

.list {
  position: relative;
  height: calc(100% - 50px);
  // height: calc(v-bind(renderHeight) - 50px - constant(safe-area-inset-bottom));
  // height: calc(v-bind(renderHeight) - 50px - env(safe-area-inset-bottom));
  overflow-y: auto;
  background-color: #f6f6f6;

  :deep(.uni-scroll-view-content) {
    height: auto;
  }
}
.cardVue {
  position: relative;
  padding: 10px !important;

  .title {
    display: flex;
    gap: 5px;
    align-items: centpx;

    .title-text {
      max-width: 80%;
      font-family: Source Han Sans CN;
      font-size: 16px;
      font-weight: 600;
      color: rgba(0, 82, 217, 1);
    }
  }
  .card_content {
    font-family: Alibaba PuHuiTi;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.8);
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      color: rgba(0, 0, 0, 0.6);
    }
    .button {
      width: 60px;
      height: 25px;
      margin: 0px;
      font-size: 14px;
      font-weight: 400;
      line-height: 25px;
      color: #0052d9;
      border-color: #0052d9;
    }
  }
}
</style>
