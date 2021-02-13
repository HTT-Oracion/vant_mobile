import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const USER_TOKEN = 'token',
  USER_REFRESH = 'refreshToken'
export default new Vuex.Store({
  state: {
    user: getItem(USER_TOKEN),
    refreshToken: getItem(USER_REFRESH)
  },
  mutations: {
    SET_USER (state, value) {
      state.user = value
      setItem(USER_TOKEN, value)
    },
    SET_REFRESH (state, value) {
      state.refreshToken = value
      setItem(USER_REFRESH, value)
    }
  },
  actions: {
  },
  modules: {
  }
})
