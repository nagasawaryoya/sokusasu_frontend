import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import firebase from 'firebase'

Vue.config.productionTip = false

// var firebaseConfig = {
//   apiKey: "AIzaSyBi0duOWJALnXpp-HlTH5WKKjNZ1q7MPwo",
//   authDomain: "untakecourage.firebaseapp.com",
//   databaseURL: "https://untakecourage.firebaseio.com",
//   projectId: "untakecourage",
//   storageBucket: "untakecourage.appspot.com",
//   messagingSenderId: "857334928770",
//   appId: "1:857334928770:web:cdb8d8a5e7f8ffd085ab9b",
//   measurementId: "G-P3TNP90G19"
// };
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


// const provider = new firebase.auth.TwitterAuthProvider()
// firebase.auth().signInWithPopup(provider)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
