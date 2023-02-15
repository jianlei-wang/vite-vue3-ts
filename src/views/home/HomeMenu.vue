<template>
  <div class="home-menu">
    <el-button v-for="item in routes" :key="item.name" @click="handleClick(item.path)">{{ item.name }}</el-button>
  </div>
</template>
<script setup lang='ts'>
// 方法引入
import { reactive, ref, onBeforeMount, onMounted } from 'vue'
import { computed } from "@vue/reactivity";
import router from '@/router';

// 接口引入
import { GetDynamicRoutes } from "@/api/home"
// 状态管理器引入
import { useHomeStore } from "@/store/modules/home";

const homeStore = useHomeStore()
onBeforeMount(() => {
  GetDynamicRoutes().then(res => {
    homeStore.updateRoutes(res.data, router)
  })
})
const routes = computed(() => homeStore.routes)
// 路由按钮点击事件
const handleClick = (path: string) => {
  router.push(path)
}
</script>
<style lang="scss" scoped>
.home-menu {
  position: absolute;
  top: 90px;
  z-index: 10;
}
</style>
