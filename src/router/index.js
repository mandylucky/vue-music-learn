import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/recommendPage.vue'/* */)
  },
  {
    path: '/singer',
    component: () => import('@/views/singerPage.vue'),
    children:[{
      path:':id',
      component:()=>import("@/views/singer-detail.vue")
    }]
  },
  {
    path: '/top-list',
    component: () => import('@/views/topListPage.vue')
  },
  {
    path: '/search',
    component: () => import('@/views/searchPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
