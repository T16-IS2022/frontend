import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/pubblica',
    name: 'pubblica',
    component: () => import('../views/PubblicaView.vue')
  },
  {
    path: '/profilo',
    name: 'profilo',
    component: () => import('../views/ProfiloView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/LogoutView.vue')
  },
  {
    path: '/cancella-account',
    name: 'cancella-account',
    component: () => import('../views/CancellaAccountView.vue')
  },
  {
    path: '*',
    component: () => import('../views/ErrorPageView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
