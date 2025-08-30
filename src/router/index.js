import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/recommendPage.vue'/*webpackChunkName:'recommend'*/),
    children:[{
      path:':id',
      component:()=>import("@/views/album.vue"/*webpackChunkName:'album'*/)
    }]
  },
  {
    path: '/singer',
    component: () => import('@/views/singerPage.vue'/*webpackChunkName:'singerPage'*/),
    children:[{
      path:':id',
      component:()=>import("@/views/singer-detail.vue"/*webpackChunkName:'singerdetail'*/)
    }]
  },
  {
    path: '/top-list',
    component: () => import('@/views/topListPage.vue'/*webpackChunkName:'topListPage'*/),
     children:[{
      path:':id',
      component:()=>import("@/views/top-detail.vue"/*webpackChunkName:'top-detail'*/)
    }]
  },
  {
    path: '/search',
    component: () => import('@/views/searchPage.vue'/*webpackChunkName:'searchPage'*/)
  },
  {
    path:'/user',
    components:{
      user:()=>import("@/views/user-center.vue"/*webpackChunkName:'user-center'*/)
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
