import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores';

import Index from '@/views/index.vue';
import Login from '@/views/login.vue';
import Register from '@/views/register.vue';

const routes: RouteRecordRaw[] = [
     { path: '/', name: 'index', component: Index, meta: { title: 'Home Page' } },
     { path: '/login', name: 'login', component: Login, meta: { title: 'Login Page' } },
     { path: '/register', name: 'register', component: Register, meta: { title: 'Register Page' } },
];

const router = createRouter({
     history: createWebHistory('/'),
     routes,
});

router.beforeEach((to, from, next) => {
     document.title = <string>to.meta.title;

     next();
});

router.beforeEach((to, from, next) => {
     const authStore = useAuthStore();

     if (authStore.isAuth.isAuthenticated) {
          if (to.name === 'login' || to.name === 'register') {
               next({ name: 'index' });
          } else {
               next();
          }
     } else {
          if (to.name === 'login' || to.name === 'register') {
               next();
          } else {
               next({ name: 'login' });
          }
     }
});

export default router;
