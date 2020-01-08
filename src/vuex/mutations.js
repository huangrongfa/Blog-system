import * as types from './mutation-types'

const mutations = {
  [types.GET_USERNAME](state, userinfo) {
    state.userinfo = userinfo
    window.localStorage.setItem('userinfo', JSON.stringify(userinfo))
  }
}
export default mutations