import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import VueWechatTitle from 'vue-wechat-title'
import './assets/reset.css'

Vue.use(ElementUI)
Vue.use(VueWechatTitle)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
