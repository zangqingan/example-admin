// 饿了么组件库使用中文
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 全局样式、全局字体相关
import './assets/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: zhCn,
  // 支持 large、default、small
  size: 'default'
})

app.mount('#app')
