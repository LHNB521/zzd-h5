import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '高景',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F8F8F8',
    transparentTitle: 'auto',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  pages: [
    {
      path: 'pages/index/index',
      type: 'home',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '首页',
      },
    },
    {
      path: 'pages/file/preview',
      type: 'home',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: 'pdf预览',
      },
    },
  ],
  tabBar: {
    // tab 上的文字默认颜色
    color: '#191F2599',
    // tab 上的文字选中时的颜色
    selectedColor: '#0085FF',
    // tabbar 上边框的颜色
    borderStyle: '#191F251F',
    // tab 的背景色
    backgroundColor: '#ffffff',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        // 页面路径，必须在 pages 中先定义
        pagePath: 'pages/project/index',
        // 图片路径
        iconPath: 'static/tabbar/project_tab1.png',
        // 选中时的图片路径
        selectedIconPath: 'static/tabbar/project_tab.png',
        // tab 上按钮文字
        text: '项目公示',
      },
      {
        // 页面路径，必须在 pages 中先定义
        pagePath: 'pages/file/index',
        // 图片路径
        iconPath: 'static/tabbar/file_tab1.png',
        // 选中时的图片路径
        selectedIconPath: 'static/tabbar/file_tab.png',
        // tab 上按钮文字
        text: '政策文件',
      },
      {
        // 页面路径，必须在 pages 中先定义
        pagePath: 'pages/map/index',
        // 图片路径
        iconPath: 'static/tabbar/chart_tab1.png',
        // 选中时的图片路径
        selectedIconPath: 'static/tabbar/chart_tab.png',
        // tab 上按钮文字
        text: '一张图',
      },
    ],
  },
})
