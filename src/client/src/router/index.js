import Vue from 'vue'
import VueRouter from 'vue-router'
import Texts from '../views/Texts.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Texts',
    component: Texts
  },
  {
    path: "/details/:id",
    name: 'TextDetails',
    component: () => import(/* webpackChunkName: "text-details" */ '@/views/TextDetails.vue')
  },
  {
    path: '/process/:id',
    name: 'ProcessText',
    component: () => import(/* webpackChunkName: "process-text" */ '@/views/ProcessText.vue')
  },
  {
    path: '/learn/:id',
    name: 'Learn',
    component: () => import(/* webpackChunkName: "learn-text" */ '@/views/Learn.vue')
  },
  {
    path: '/learn/add',
    name: 'AddText',
    component: () => import(/* webpackChunkName: "add-text" */ '@/views/AddText.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
