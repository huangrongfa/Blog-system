import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = resolve => require.ensure([], () => resolve(require('./components/login/login.vue')))
const home = resolve => require.ensure([], () => resolve(require('./pages/home/home.vue')))
const homedetail = resolve => require.ensure([], () => resolve(require('./pages/homedetail/homedetail.vue')))
const people = resolve => require.ensure([], () => resolve(require('./pages/people/people.vue')))
const wonder = resolve => require.ensure([], () => resolve(require('./pages/wonderful/wonderPage.vue')))




const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/homedetail',
      name: 'homedetail',
      component: homedetail,
      meta: {
        title: '博客详情'
      }
    },
    {
      path: '/people',
      name: 'people',
      component: people,
      meta: {
        title: '个人简介'
      }
    },
    {
      path: '/wonder',
      name: 'wonder',
      component: wonder,
      meta: {
        title: '精彩生活'
      }
    }
  ],
})

export default router