// 经纬度数据类型
export type degreesPos = {
  lng: Number;
  lat: Number;
  height?: Number;
};
// 弹窗参数类型
export type mapPopupOptions = {
  px: windowPosition | undefined;
  type: String;
  id: String;
  properties: any;
};
import { Cartesian3, Cartesian2, Cartographic } from 'cesium';
export type cartesian3 = Cartesian3;
export type cartographic = Cartographic;
export type windowPosition = Cartesian2;
