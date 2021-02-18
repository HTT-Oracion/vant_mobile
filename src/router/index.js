import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/Login.vue'
import { Dialog } from 'vant'
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isUser: false } },
  {
    path: '/', component: () => import('@/views/Layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: { isUser: false }
      },
      {
        path: '/answer',
        name: 'answer',
        component: () => import('@/views/Answer'),
        meta: { isUser: true }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/Video'),
        meta: { isUser: true }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/My'),
        meta: { isUser: false }
      }
    ]
  },
  {
    path: '/user/profile', name: 'user-profile', component: () => import('@/views/UserProfile'),
    meta: { isUser: true }
  },
  {
    path: '/search', name: 'search', component: () => import('@/views/Search'),
    meta: { isUser: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/Article'),
    props: true,
    meta: { isUser: false }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.isUser) {
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: '访问提示',
      message: '需要登录,是否前往登录页面?',
    }).then(() => {
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => {
      next(false)
    });
  } else {
    next()
  }
})
export default router
