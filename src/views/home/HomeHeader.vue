<template>
  <div class="home-header">
    <div class="item left">
      <span class="up">
        <label>晴 30℃</label>
        <SvgIcon name="weather-cloudy" class="home-svg"></SvgIcon>
      </span>
      <span class="down">
        空气质量：优
      </span>
    </div>
    <div class="item title">重庆市涪陵区森林火灾监测预警与应急指挥系统</div>
    <div class="item ">
      <div class="user">
        <SvgIcon name="login-user" class="home-svg"></SvgIcon>
        <label>admin</label>
        <SvgIcon name="login-exit" width="18" height="18"></SvgIcon>
      </div>
      <div class="time">
        <span class="up">
          <SvgIcon name="home-time" class="home-svg"></SvgIcon>
          <label>14:07:06</label>
        </span>
        <span class="down">2023-02-10 星期五</span>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref, onBeforeMount, onMounted } from 'vue'
</script>
<style lang="scss" scoped>
.home-header {
  width: 100%;
  height: 90px;
  background: url("@/assets/home/header.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  color: #fff;
  justify-content: space-between;

  .item {
    height: 100%;
    background: #01131f;
    display: inline-flex;
    align-items: center;
    min-width: 220px;
    justify-content: center;
    padding: 0 20px;

    &.left {
      flex-direction: column;
      align-items: flex-start;
    }

    &.title {
      font-size: 28px;
      letter-spacing: 2px;
    }

    .up {
      font-size: 20px;
      display: flex;
      margin-bottom: 10px;
    }

    .home-svg {
      width: 26px !important;
      height: 26px !important;
      margin: 0 5px;
    }
  }

  // .sides {
  //   display: flex;
  //   flex-direction: column;
  // }
}
</style>
