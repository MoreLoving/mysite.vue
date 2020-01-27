import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import(/* webpackChunkName: "index" */ '../views/index'),
    meta:{
      title:"首页",
    }
  },
  {
    path: "/archives",
    name: "archives",
    component: () => import(/* webpackChunkName: "archives" */ '../views/archives'),
    meta:{
      title:"文章",
    }
  },
  {
    path: "/dynamic",
    name: "dynamic",
    component: () => import(/* webpackChunkName: "dynamic" */ '../views/dynamic'),
    meta:{
      title:"动态",
    }
  },
  {
    path: "/message",
    name: "message",
    component: () => import(/* webpackChunkName: "message" */ '../views/message'),
    meta:{
      title:"留言",
    }
  },
  {
    path: "/blog/:id",
    name: "blog",
    meta:{
      title:"正文"
    },
    component: () => import(/* webpackChunkName: "blog" */ '../views/blog'),
  },
  {
    path: "/category/:type",
    name: "category",
    meta:{
      title:"分类",
    },
    component: () => import (/* webpackChunkName: "category" */ '../views/category')
  },
  {
    path: "*",
    name: "notfound",
    meta:{
      title:"404",
    },
    component: () => import (/* webpackChunkName: "404" */ '../views/notfound')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router
