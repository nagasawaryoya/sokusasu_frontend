import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // created() {
  //   // created時に初期StateをlocalStorageに保存しておく。
  //   localStorage.setItem('user', JSON.stringify(user));
  // },
}).$mount('#app')
