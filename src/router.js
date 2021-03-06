import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// NProgress配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(Router)

const login = resolve => require.ensure([], () => resolve(require('./components/login/login.vue')))
const home = resolve => require.ensure([], () => resolve(require('./pages/home/home.vue')))
const homedetail = resolve => require.ensure([], () => resolve(require('./pages/homedetail/homedetail.vue')))
const people = resolve => require.ensure([], () => resolve(require('./pages/people/people.vue')))
const wonder = resolve => require.ensure([], () => resolve(require('./pages/wonderful/wonderPage.vue')))
const messagePage = resolve => require.ensure([], () => resolve(require('./pages/lmessage/messagePage.vue')))
const likePage = resolve => require.ensure([], () => resolve(require('./pages/like/likePage.vue')))

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
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
      path: '/homedetail/',
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
    },
    {
      path: '/likePage',
      name: 'likePage',
      component: likePage,
      meta: {
        title: '猜你喜欢'
      }
    },
    {
      path: '/messagePage',
      name: 'messagePage',
      component: messagePage,
      meta: {
        title: '留言本'
      }
    }
  ],
})

export default router

// 全局全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from, next) => {
  NProgress.done()
})