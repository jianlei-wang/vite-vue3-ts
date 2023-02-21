<template>
  <div class="layer-tree">
    <div class="tree-title">
      <label>专题资源</label>
      <img src="@/assets/images/home/decorate.png">
    </div>
    <div class="layer-item" v-for="item in layerItmes" :key="item.id" @click="changeItem(item)" @dblclick="zoomTo(item)">
      <SvgIcon :name="item.defaultChecked ? 'layers-' + item.icon + '_checked' : 'layers-' + item.icon" width="22"
        height="22"></SvgIcon>
      <span class="item-name" :class="{ active: item.defaultChecked }">{{ item.name + "（" + item.count + "）" }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetLayerList } from '@/api/modules/home-map';
import { updateLayer } from '@/utils/map-layers';
import { onMounted, ref } from 'vue';

onMounted(() => {
  GetLayerList().then(res => {
    for (let index = 0; index < res.data.length; index++) {
      const item = res.data[index]
      item.defaultChecked && updateLayer(true, item)
      layerItmes.value.push(item)
    }
  }).catch(err => {
    throw new Error(err);
  })
})
const layerItmes = ref<any[]>([])
let timer: NodeJS.Timeout
const changeItem = (item: any) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    item.defaultChecked = !item.defaultChecked
    updateLayer(item.defaultChecked, item)
  }, 300);
}
const zoomTo = (item: any) => {
  clearTimeout(timer)
  console.log("跳转到图层范围：", item.name)
}
</script>
<style lang="scss" scoped>
.layer-tree {
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 10;
  color: #fff;
  background: #0d0d0de3;
  width: 300px;
  height: calc(100% - 120px);
  padding: 15px 12px;
  border-radius: 2px;

  .tree-title {
    font-size: 17px;
    font-weight: bolder;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    letter-spacing: 3px;

    img {
      width: 101px;
      height: 15px;
      margin: 0 10px;
    }
  }

  .layer-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;

    * {
      cursor: pointer;
    }

    &:hover {
      color: #34bee0;
      font-weight: bold;
      background: #41454B;
    }

    .item-name {
      font-size: 15px;
      margin: 0 5px;
      letter-spacing: 1px;

      &.active {
        color: #409eff;
        font-weight: bold;
      }
    }
  }


}
</style>