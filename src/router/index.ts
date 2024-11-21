import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/TabsPage.vue'
import HomePage from '@/views/pages/HomePage.vue';
// import AddEditPage from '@/views/pages/AddEditPage.vue';
import Add from '@/views/pages/Add.vue';
import Edit from '@/views/pages/Edit.vue';
import View from '@/views/pages/View.vue';
import Listing from '@/views/pages/Listing.vue';
import Dashboard from '@/views/pages/Dashboard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    props: true,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      { path: '/dashboard', component: HomePage },
      // { path: '/add', component: AddEditPage },
      { path: '/add', component: Add },
      { path: '/edit/:id', component: Edit },
      { path: '/view/:id', component: View },
      // { path: '/listing', component: Listing },
      // { path: '/dashboard', component: Dashboard },

    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
