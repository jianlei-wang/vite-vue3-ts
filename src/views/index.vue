<template>
  <div class="home-main" v-if="finish">
    <HomeHeader></HomeHeader>
    <div>
      <el-button v-for="item in routes" :key="item.name" @click="handleClick(item.path)">{{ item.name }}</el-button>
    </div>
    <RouterView />
  </div>

</template>
<script setup lang='ts'>
// 方法引入
import { reactive, ref, onBeforeMount, onMounted } from 'vue'
import { computed } from "@vue/reactivity";
import { getLocalStorage } from '@/utils/localstorage'
import router from '@/router';
// 组件引入
import HomeHeader from './home/HomeHeader.vue';
// 接口引入
import { GetDynamicRoutes } from "@/api/home"
// 状态管理器引入
import { useHomeStore } from "@/store/modules/home";

const homeStore = useHomeStore()
onBeforeMount(() => {
  if (!getLocalStorage("LH_TOKEN")) {
    router.push("/login")
  } else {
    alert("登陆成功")
    GetDynamicRoutes().then(res => {
      homeStore.updateRoutes(res.data, router)
    })
    finish.value = true
  }
})
const routes = computed(() => homeStore.routes)
// 路由按钮点击事件
const handleClick = (path: string) => {
  router.push(path)
}
let finish = ref(false)
</script>
<style lang="scss" scoped>
.home-main {}
</style>
