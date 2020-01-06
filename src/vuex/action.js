import * as types from './mutation-types'

export const getuserinfo = function({commit}, userinfo) {
  commit(types.GET_USERNAME, userinfo)
}
