import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件 main.js一启动就安装toast
// 使用Vue.use 本质上会调用toast对象的install方法
Vue.use(toast)

// 解决移动端300ms点击延迟问题
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad,{
  loading : require('./assets/img/LOADING.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
