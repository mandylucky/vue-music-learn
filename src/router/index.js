import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/recommendPage.vue'/* */),
    children:[{
      path:':id',
      component:()=>import("@/views/album.vue")
    }]
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
    component: () => import('@/views/topListPage.vue'),
     children:[{
      path:':id',
      component:()=>import("@/views/top-detail.vue")
    }]
  },
  {
    path: '/search',
    component: () => import('@/views/searchPage.vue')
  },
  {
    path:'/user',
    components:{
      user:()=>import("@/views/user-center.vue")
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
