<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '项目公示',
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
      <!-- <uni-load-more :status="status" v-if="status === 'loading'" /> -->
      <CardVue class="cardVue" v-for="item in list" :key="item.id">
        <view class="card_content">
          {{ item.title }}
        </view>
        <template #footer>
          <view class="footer">
            <text class="time">{{ item.date.split(' ')[0] }}</text>
            <wd-button class="button" plain :round="false" @click="handleLook(item.url)">
              查看
            </wd-button>
          </view>
        </template>
      </CardVue>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { getInfoList } from '@/service/index/foo'
import { debounce } from '@/utils/common/index'
// import { useAppStore } from '@/store'
import CardVue from '@/components/Card.vue'

// const appStore = useAppStore()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// const renderHeight = ref<string>(appStore.renderHeight + 'px') // 设备屏幕高度
const FileURL = import.meta.env.VITE_FILE_API_BASEURL

const searchValue = ref()
const queryForm = reactive({ pageNum: 1, pageSize: 10, typeId: 2, title: '' })
const status = ref<any>('loading')
const list = ref([])
const total = ref(0)
const inputHandle = () => {
  queryForm.title = searchValue.value
  getList()
}

// 监听输入框
const debounceInput = debounce(inputHandle, 500, false)

// 获取数据列表
async function getList() {
  status.value = 'loading'
  try {
    const res: any = await getInfoList(queryForm)
    if (res) {
      list.value = res.rows
      total.value = res.total
    }
    status.value = 'more'
  } catch (e) {
    status.value = 'more'
  }
}

// 点击查看
function handleLook(e: string) {
  let url: string
  const u = e.startsWith('http') ? e : FileURL + e
  const u2 = e.startsWith('http') ? e : window.location.origin + FileURL + e
  if (process.env.NODE_ENV === 'development') {
    url = u
  } else {
    url = u2
  }
  uni.previewImage({
    urls: [url],
  })
}
// 触底加载
const handelLower = () => {
  queryForm.pageSize += 10
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
