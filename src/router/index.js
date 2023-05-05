import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')
const MyOrder = () => import('@/pages/Center/MyOrder')
const GroupOrder = () => import('@/pages/Center/GroupOrder')

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    )
  }
}

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: { show: true }
    },
    {
      path: '/',
      redirect: '/home',
      meta: { show: true }
    },
    {
      name: 'search',
      path: '/search/:keyword?',
      component: Search,
      meta: { show: true }
    },
    {
      path: '/login',
      component: Login,
      meta: { show: false }
    },
    {
      path: '/register',
      component: Register,
      meta: { show: false }
    },
    {
      path: '/detail/:id',
      component: Detail,
      meta: { show: false }
    },
    {
      path: '/addcartsuccess',
      name: 'addcartsuccess',
      component: AddCartSuccess,
      meta: { show: true }
    },
    {
      path: '/shopcart',
      component: ShopCart,
      meta: { show: true }
    },
    {
      path: '/trade',
      component: Trade,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/pay',
      component: Pay,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/paySuccess',
      component: PaySuccess,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/pay') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/center',
      component: Center,
      children: [
        { path: 'myOrder', component: MyOrder },
        { path: 'groupOrder', component: GroupOrder },
        { path: '/center', redirect: '/center/myOrder' }

      ],
      meta: { show: true }
    },
  ],
  scrollBehavior() {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem('TOKEN')) {
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      if (store.state.user.userInfo.name) {
        next()
      } else {
        try {
          await store.dispatch('user/userInfo')
          next()
        } catch (error) {
          await store.dispatch('user/userExit')
          next('/login')
        }
      }

    }
  } else {
    if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1 || to.path == '/shopcart') {
      next(`/login?redirect=${to.path}`)
    } else {
      next()
    }
  }
})

export default router
