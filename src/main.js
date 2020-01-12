import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './vuex/index'
import axios from 'axios'
import VueWechatTitle from 'vue-wechat-title'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/reset.css'

Vue.use(ElementUI)
Vue.use(VueWechatTitle)
Vue.config.productionTip = false
Vue.prototype.$axios = axios


// 导航全局守卫
// router.beforeEach((to, from, next) => {
//   console.log(store.state)
//   next()
// })


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
