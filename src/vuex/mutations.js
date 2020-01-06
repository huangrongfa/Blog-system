import * as types from './mutation-types'

const mutations = {
  [types.GET_USERNAME](state, userinfo) {
    state.userinfo = userinfo
    // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动
    window.localStorage.setItem('userinfo', userinfo)
  }
}

export default mutations
