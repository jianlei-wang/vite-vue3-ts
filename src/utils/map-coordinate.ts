import { cartesian3, degreesPos, windowPosition } from './custom-types';

const Cesium = window.Cesium;
/**
 * 坐标转换 84转笛卡尔
 * @param position WGS84坐标
 * @param height
 * @returns 笛卡尔坐标
 */
export const transformWGS84ToCartesian = (
  position: degreesPos,
  height: Number = 0
) => {
  return position
    ? Cesium.Cartesian3.fromDegrees(
        position.lng || position.lng,
        position.lat,
        (position.height = height || position.height),
        Cesium.Ellipsoid.WGS84
      )
    : Cesium.Cartesian3.ZERO;
};

// /***
//  * 坐标转换 笛卡尔转84
//  * @param {Object} Cartesian3 三维位置坐标
//  * @return {Object} {lng,lat,alt} 地理坐标
//  */
const transformCartesianToWGS84 = (cartesian: cartesian3) => {
  let ellipsoid = Cesium.Ellipsoid.WGS84;
  let cartographic = ellipsoid.cartesianToCartographic(cartesian);
  return {
    lng: Cesium.Math.toDegrees(cartographic.longitude),
    lat: Cesium.Math.toDegrees(cartographic.latitude),
    alt: cartographic.height,
  };
};
/**
 * 根据屏幕坐标获取笛卡尔坐标
 * @param px 屏幕坐标
 * @param viewer 三维场景
 * @returns
 */
export const getCatesian3FromPX = (
  px: windowPosition,
  viewer: any = window.Viewer
) => {
  let picks = viewer.scene.drillPick(px);
  let cartesian = null;
  let isOn3dtiles = false,
    isOnTerrain = false;
  // drillPick
  for (let i in picks) {
    let pick = picks[i];
    if (
      (pick && pick.primitive instanceof Cesium.Cesium3DTileFeature) ||
      (pick && pick.primitive instanceof Cesium.Cesium3DTileset) ||
      (pick && pick.primitive instanceof Cesium.Model)
    ) {
      //模型上拾取
      isOn3dtiles = true;
    }
    // 3dtilset
    if (isOn3dtiles) {
      viewer.scene.pick(px);
      cartesian = viewer.scene.pickPosition(px);
      if (cartesian) {
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        if (cartographic.height < 0) cartographic.height = 0;
        let lng = Cesium.Math.toDegrees(cartographic.longitude),
          lat = Cesium.Math.toDegrees(cartographic.latitude),
          height = cartographic.height;
        cartesian = transformWGS84ToCartesian({
          lng: lng,
          lat: lat,
          height: height,
        });
      }
    }
  }
  // 地形
  let boolTerrain =
    viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider;
  // Terrain
  if (!isOn3dtiles && !boolTerrain) {
    let ray = viewer.scene.camera.getPickRay(px);
    if (!ray) return null;
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    isOnTerrain = true;
  }
  // 地球
  if (!isOn3dtiles && !isOnTerrain && boolTerrain) {
    cartesian = viewer.scene.camera.pickEllipsoid(
      px,
      viewer.scene.globe.ellipsoid
    );
  }
  if (cartesian) {
    let position = transformCartesianToWGS84(cartesian);
    if (position.alt < 0) {
      cartesian = transformWGS84ToCartesian(position, 0.1);
    }
    return cartesian;
  }
  return false;
};

export const getHeightByPositions = (
  positions: cartesian3[],
  callback?: Function,
  viewer: any = window.Viewer
) => {
  const cartographic = positions.map((item) => {
    return Cesium.Cartographic.fromCartesian(item);
  });
  const terrainProvider = viewer.terrainProvider;
  const promise = Cesium.sampleTerrain(terrainProvider, 12, cartographic);
  Promise.resolve(promise).then((updatedPositions) => {
    callback && typeof callback === 'function' && callback(updatedPositions);
  });
};

export const getHeigthByDegrees = (
  lng: Number,
  lat: Number,
  callback?: Function,
  viewer: any = window.Viewer
) => {
  var cartographic = Cesium.Cartographic.fromDegrees(lng, lat);
  const terrainProvider = viewer.terrainProvider;
  const promise = Cesium.sampleTerrain(terrainProvider, 12, [cartographic]);
  Promise.resolve(promise).then((updatedPositions) => {
    callback && typeof callback === 'function' && callback(updatedPositions);
  });
};
