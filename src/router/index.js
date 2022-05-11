import Vue from 'vue'
import VueRouter from 'vue-router'
import myLogin from '../views/myLogin.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)
//路由
const routes = [
  {
    path: '/',
    name: 'myLogin',
    component: myLogin,
    meta: {
      title: "登录",
    }
  },

  {
    path: "/404",
    name: '404',
    component: NotFound,
    meta: {
      title: "404"
    },
  },
  {
    path: "*",
    redirect: "/404",
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
