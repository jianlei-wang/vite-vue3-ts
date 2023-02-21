import { mapPopupOptions, windowPosition } from '@/utils/custom-types';
import { defineStore } from 'pinia';
import { storeMap } from '../types/map';

export const useMapStore = defineStore('map', {
  state: (): storeMap => {
    return {
      layers: [],
      showPop: false,
      selectFeature: undefined,
    };
  },
  getters: {
    mapLayers(state) {
      return state.layers;
    },
    mapSelectFeature(state) {
      return state.selectFeature;
    },
    showMapPop(state) {
      return state.showPop;
    },
  },
  actions: {
    addLayer(item: any) {
      this.layers.push(item);
    },
    removeLayer(id: String) {
      const index = this.layers.findIndex((el) => {
        return el.id === id;
      });
      index != -1 && this.layers.splice(index, 1);
    },
    updateShowPop(show: boolean, options: mapPopupOptions) {
      this.selectFeature = show ? options : undefined;
      this.showPop = show;
    },
  },
});
