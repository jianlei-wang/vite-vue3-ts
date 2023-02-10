import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '@/views/index.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/index.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
