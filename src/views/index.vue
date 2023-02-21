<template>
  <div class="app-main" v-loading="finish">
    <HomeHeader></HomeHeader>
    <div id="cesiumContainer"></div>
    <HomeMenu></HomeMenu>
    <PopupForm v-if="showPop" :item="popItem"></PopupForm>
    <RouterView />
  </div>
</template>
<script setup lang='ts'>
// 方法引入
import { reactive, ref, onBeforeMount, onMounted, nextTick, computed } from 'vue'
import { getLocalStorage } from '@/utils/localstorage'
import router from '@/router';
import { initMap } from "@/utils/map-layers";
import { useMapStore } from '@/store/modules/map';
// 组件引入
import HomeHeader from './home/HomeHeader.vue';
import HomeMenu from './home/HomeMenu.vue';
onMounted(() => {
  if (!getLocalStorage("LH_TOKEN")) {
    router.push("/login")
  } else {
    nextTick(() => {
      initViewer()
    })
  }
})
const mapStore = useMapStore()
let showPop = computed(() => mapStore.showMapPop)
let popItem = computed(() => mapStore.mapSelectFeature || {})
let finish = ref(true)
const initViewer = () => {
  const Cesium = window.Cesium
  let key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYjUwNWQyOC0yZmZhLTRmMzItOTQyZC02ZmQyMWIyMTA3NmEiLCJpZCI6NjcyNzcsImlhdCI6MTY2ODE1ODc2Mn0.t1h6-ZADkGnZUZZoLtrlgtTp8_MR2Kxfhew42ksDgmk";
  Cesium.Ion.defaultAccessToken = key;
  let viewer = window.Viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    }),
    terrainProvider: new Cesium.CesiumTerrainProvider({
      url: 'https://www.larkview.cn/tileserver/api/terrain/china_dem_30/'
    }),
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,
    //关闭点选出现的提示框
    selectionIndicator: false,
    infoBox: false,
    // requestWebgl2: true
  });
  viewer.scene.debugShowFramesPerSecond = true;//开启帧率
  // viewer.scene.globe.depthTestAgainstTerrain = true;//开启深度检测
  viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
  initMap(() => {
    finish.value = false
  })

}
</script>
<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  #cesiumContainer {
    position: relative;
    width: 100%;
    height: calc(100% - 70px);
  }
}
</style>
