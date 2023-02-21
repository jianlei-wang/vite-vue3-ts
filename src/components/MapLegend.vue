<template>
  <div class="legend-main">
    <span title="图例" v-if="collapse" @click="collapse = false">
      <SvgIcon class="svg-collapse" name="layers-legend" width="24" height="24"></SvgIcon>
    </span>
    <div class="content" v-else>
      <div class="title">
        <span>图例</span>
        <span @click="collapse = true">
          <SvgIcon name="layers-down" @click="collapse = true"></SvgIcon>
        </span>
      </div>
      <div class="items">
        <span class="lg-item" v-for="item in layes" :key="item.id">
          <SvgIcon :name="'layers-' + item.img + '_checked'" width="24" height="24"></SvgIcon>
          <label class="name">{{ item.name }}</label>
        </span>
        <span class="lg-item nolayer" v-if="layes.length === 0">未选择图层</span>
      </div>
    </div>
</div>
</template>
<script setup lang='ts'>
import { useMapStore } from '@/store/modules/map';
import { reactive, ref, onBeforeMount, onMounted, computed } from 'vue'
const collapse = ref(true)
const mapStore = useMapStore()
const layes = computed(() => {
  const layers: any = []
  for (let i = 0; i < mapStore.mapLayers.length; i++) {
    const layer = mapStore.mapLayers[i];
    for (let n = 0; n < layer.legends.length; n++) {
      layers.push(layer.legends[n])
    }
  }
  return layers
})
</script>
<style lang="scss" scoped>
.legend-main {
  position: absolute;
  right: 0px;
  bottom: 0;
  margin: 10px;
  padding: 10px;
  z-index: 10;
  background: #0d0d0de3;
  border-radius: 2px;

  .svg-collapse {
    cursor: pointer;
  }

  .content {
    .title {
      font-weight: bolder;
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .items {
      font-size: 15px;
      display: flex;
      flex-direction: column;
      width: 180px;
      max-height: 250px;
      overflow-y: auto;

      .lg-item {
        display: flex;
        align-items: center;
        margin: 8px 0;

        &.nolayer {
          color: #808080;
        }

        .name {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
