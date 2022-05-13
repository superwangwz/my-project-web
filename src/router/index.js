import Vue from 'vue'
import VueRouter from 'vue-router'
import myLogin from '../views/myLogin.vue'
import NotFound from '../views/NotFound.vue'
import myRegister from '../views/myRegister'
import myHome from '../views/myHome'

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
    path: '/myHome',
    name: 'myHome',
    component: myHome,
    meta: {
      title: "登录",
    }
  },

  {
    path: "/register",
    name: 'register',
    component: myRegister,
    meta: {
      title: "注册"
    },
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
