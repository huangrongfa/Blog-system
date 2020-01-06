import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: '' || window.localStorage.getItem('userinfo')
  },
  mutations,
  getters
})

export default store