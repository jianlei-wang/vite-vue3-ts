import { mapPopupOptions } from '@/utils/custom-types';

export type storeMap = {
  layers: any[]; //当前显示的图层，参考图例
  showPop: boolean; //是否显示弹窗
  selectFeature: mapPopupOptions | undefined; //当前点选的对象
};
