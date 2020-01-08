import * as types from './mutation-types'

export const saveInfo = function({commit}, userinfo) {
  commit(types.GET_USERNAME, userinfo)
}