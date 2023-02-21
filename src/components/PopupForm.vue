<template>
  <div class="popup-form-main">
    <div>地图弹窗</div>
    <StationPopup v-if="type === 'fire_monitor_station'"></StationPopup>
    <VideoPopup v-if="type === 'fire_monitor_video'"></VideoPopup>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref, onBeforeMount, onMounted, computed } from 'vue'
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
onMounted(() => {
  console.log(props.item)
})
const type = computed(() => props.item.type)
</script>
<style lang="scss" scoped>
.popup-form-main {
  position: absolute;
  left: 500px;
  top: 500px;
  z-index: 20;
}
</style>
