import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

// 自动设置 REM 基准值 （html 标签字体大小）
import 'amfe-flexible'

import './styles/index.less'

// 全局注册Vant 中的组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
