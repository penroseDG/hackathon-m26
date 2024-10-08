import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/DashBoard.vue';
import ManagerProduct from '@/views/ManagerProduct.vue';
import ManagerCategory from '@/views/ManagerCategory.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [

  { 
    path: '/',
     name: 'Dashboard',
     component: Dashboard 
    
  }, 
  {
     path: '/manager-product', 
    name: 'ManagerProduct',
     component: ManagerProduct 
  },
  { 
    path: '/manager-category',
     name: 'ManagerCategory',
      component: ManagerCategory
    
    },
  { 
    path: '/:pathMatch(.*)*',
     name: 'NotFound', 
     component: NotFound
    }, 
    {
      path: '/',
      redirect: 'manager-product',
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
