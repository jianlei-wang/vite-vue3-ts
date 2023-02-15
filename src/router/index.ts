import { GetDynamicRoutes } from '@/api/home';
import { useHomeStore } from '@/store/modules/home';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import Home from '@/views/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/main',
    name: 'Home',
    component: () => import('@/views/index.vue'),
    children: [],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/main' && to.path !== '/') {
    const store = useHomeStore();
    if (store.routes.length < 1) {
      GetDynamicRoutes()
        .then((res) => {
          store.updateRoutes(res.data, router);
          next({ path: to.path, replace: true });
        })
        .catch((_) => {
          next();
        });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
