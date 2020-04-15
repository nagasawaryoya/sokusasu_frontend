import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const user = {
  user: {
    id: 0
  }
}
const mutations = {
  getUserId (state, val) {
    state.user.id = val
  },
}

export default new Vuex.Store({
  state: user,
  mutations,
  plugins: [createPersistedState({
    key: 'sokusasu',
    storage: window.sessionStorage
  })],
  // mutations: {
  //   // State初期化用
  //   RESET_VUEX_STATE(state) {
  //     Object.assign(state, JSON.parse(localStorage.getItem('user')));
  //   },
  // },
  actions: {
  },
  modules: {
  }
})
