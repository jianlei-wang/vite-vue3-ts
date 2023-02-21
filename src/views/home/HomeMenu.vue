<template>
  <div class="home-menu">
    <span class="menu-item" :class="{ active: item.name === selectModule }" v-for="item in routes" :key="item.name"
      @click="handleClick(item)">
      <SvgIcon :name="getSvg(item.path)" class="item-svg"></SvgIcon>
      <label>{{ item.name }}</label>
    </span>
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
let selectModule = ref("")
const homeStore = useHomeStore()
onBeforeMount(() => {
  GetDynamicRoutes().then(res => {
    homeStore.updateRoutes(res.data, router)
  })
})
const routes = computed(() => homeStore.routes)
const getSvg = (path: String) => {
  const name = path.substring(path.lastIndexOf("/") + 1, path.length)
  return "modules-" + name.toLowerCase()
}
// 路由按钮点击事件
const handleClick = (item: any) => {
  router.push(item.path)
  selectModule.value = item.name
}
</script>
<style lang="scss" scoped>
.home-menu {
  position: absolute;
  top: 80px;
  z-index: 10;
  color: #fff;

  .menu-item {
    padding: 5px 10px;
    border: 1px solid #808080ab;
    background: #0d0d0d;
    border-radius: 3px;
    margin: 0px 8px;
    font-size: 16px;
    display: inline-flex;
    align-items: center;

    &:hover {
      background: #1F98FE;
    }

    &.active {
      background: #1F98FE;
    }

    * {
      cursor: pointer;
    }

    .item-svg {
      width: 24px !important;
      height: 20px !important;
      margin-right: 5px;
    }
  }
}
</style>
