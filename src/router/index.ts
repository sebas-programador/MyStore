import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import MainLayout from '@/layouts/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/productos'
  },

  {
    path: '/productos/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/products/ProductsPage.vue')
      },
      {
        path: ':id',
        component: () => import('@/views/products/ProductDetailPage.vue')
      }
    ]
  },

  {
    path: '/favoritos/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('@/views/products/FavoritesPage.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
