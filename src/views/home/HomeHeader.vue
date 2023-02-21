<template>
  <div class="home-header">

    <div class="item left">
      <SvgIcon name="weather-sun" class="home-svg" width="17" height="17"></SvgIcon>
      <label>晴 30℃ | 空气质量：优</label>
    </div>
    <div class="item title">重庆市涪陵区森林火灾监测预警与应急指挥系统</div>
    <div class="item right">
      <label>{{ time.ymdw }} | {{ time.hms }} </label>
      <SvgIcon name="home-user" class="user-svg" width="17" height="17"></SvgIcon>
      <label class="user-name">{{ homeStore.curUser }}</label>
      <span title="退出登录" @click="exit">
        <SvgIcon name="home-exit" class="exit-svg" width="17" height="17"></SvgIcon>
      </span>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { useHomeStore } from '@/store/modules/home';
import { logOut } from "@/utils/user";
import { getTimeNow } from "@/utils/time";
import { reactive, ref, onBeforeMount, onMounted } from 'vue'
onBeforeMount(() => {
  setInterval(() => {
    const curTime = getTimeNow()
    time.hms = curTime.hms
    time.ymdw = curTime.ymdw
  }, 1000);
})
let time = reactive({
  hms: "00:00:00", ymdw: "0000-00-00 星期U"
})
const exit = () => {
  logOut()
}
const homeStore = useHomeStore()
</script>
<style lang="scss" scoped>
.home-header {
  width: 100%;
  height: 70px;
  background: #0d0d0d;
  display: flex;
  color: #818986;
  justify-content: space-between;

  .item {
    height: 100%;
    display: inline-flex;
    align-items: center;
    min-width: 500px;
    padding: 0 20px;
    font-size: 15px;

    &.left {
      justify-content: flex-start;
    }

    &.right {
      justify-content: flex-end;
    }

    &.title {
      justify-content: center;
      font-size: 30px;
      letter-spacing: 4px;
      font-weight: bolder;
      background: linear-gradient(0deg, #939189 30%, #ffffff 55%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .user-svg {
      margin-left: 10px;
    }

    .user-name {
      margin: 0 5px;
    }

    .exit-svg {
      cursor: pointer;
    }

    .home-svg {
      margin: 0 5px;
    }
  }

}
</style>
