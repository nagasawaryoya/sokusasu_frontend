import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const user = {
  user: {
    id: 0
  }
}
const mutation = {
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
  actions: {
  },
  modules: {
  }
})
