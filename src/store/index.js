import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const user = {
  user: {
    id: 0,
    twitter_id: 0,
    name: '',
    mail: '',
    password: '',
    provider: ''
  }
}
const mutations = {
  getUserId (state, val) {
    state.user.id = val.id
    state.user.twitter_id = val.twitter_id
    state.user.name = val.name
    state.user.mail = val.mail
    state.user.password = val.password
    state.user.provider = val.provider
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
