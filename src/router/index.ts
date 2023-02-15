import { GetDynamicRoutes } from '@/api/home';
import { useHomeStore } from '@/store/modules/home';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
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
  history: createWebHashHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const path = to.path;
  if (['/main', '/', '/login'].indexOf(path) != -1) {
    next();
  } else {
    const store = useHomeStore();
    if (store.routes.length < 1) {
      GetDynamicRoutes()
        .then((res) => {
          store.updateRoutes(res.data, router);
          next({ path: path, replace: true });
        })
        .catch((_) => {
          next();
        });
    } else {
      next();
    }
  }
});
export default router;
