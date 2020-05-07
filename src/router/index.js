import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Dashboard from '@/components/Dashboard'
import NewInvite from '@/components/NewInvite'
import Dummy from '@/components/Dummy'
import QRcode from '@/components/QRcode'
import QRcodeRead from '@/components/QRcodeRead'
import FriendList from '@/components/FriendList'
import FriendCandidate from '@/components/FriendCandidate'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/newInvite',
    name: 'NewInvite',
    component: NewInvite
  },
  {
    path: '/api/auth/twitter/callback',
    name: 'Dummy',
    component: Dummy
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/qrcode',
    name: 'QRcode',
    component: QRcode
  },
  {
    path: '/qrcode-read',
    name: 'QRcodeRead',
    component: QRcodeRead
  },
  {
    path: '/friend-list',
    name: 'FriendList',
    component: FriendList
  },
  {
    path: '/friend-candidate',
    name: 'FriendCandidate',
    component: FriendCandidate
  },  
  {
    path: '/talk',
    name: 'Talk',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Talk.vue')
  },
  {
    path: '/tweet',
    name: 'Tweet',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tweet.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
