import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message.vue')
  },
  // {
  //   path: '/scany',
  //   name: 'scany',
  //   component: () => import('../views/scany.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
