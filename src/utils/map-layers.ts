import { useMapStore } from '@/store/modules/map';
import { getBoundary } from '@/api/modules/home-map';
import { homeView } from './map-navigate';
import { getHeightByPositions, getHeigthByDegrees } from './map-coordinate';
import { cartographic } from './custom-types';
import { GetLayerById } from '@/api/modules/map-layers';
import { getImage } from './assets-datas';
import { radomId } from './common';
const Cesium = window.Cesium;
const mapStore = useMapStore();
/**
 * 更新地图数据
 * @param boolShow 显示或隐藏
 * @param item 数据对象
 */
export const updateLayer = (boolShow: boolean, item: any) => {
  boolShow ? addLayer(item) : removeLayer(item);
};
/**
 * 初始化地图时需要进行的操作
 * @param callback 回调函数
 */
export const initMap = (callback: Function) => {
  loadBoundary();
  initGlobeHandler();
  // getLocation();
  callback && typeof callback === 'function' && callback();
};
/**
 * 添加图层
 * @param item 待添加对象
 */
export const addLayer = (item: any) => {
  GetLayerById(item.id)
    .then((res) => {
      const type = res.data.type;
      const items = res.data.items;
      switch (type) {
        case 'billboard':
          addBillboard(item, items);
          break;
        default:
          break;
      }
      mapStore.addLayer(item); //添加图例
    })
    .catch((err) => {
      throw new Error(err);
    });
};
/**
 * 移除图层
 * @param item 待移除对象
 */
export const removeLayer = (item: any) => {
  const id = item.id;
  switch (item.type) {
    case 'billboard':
      removePrimitiveById(id);
      break;

    default:
      break;
  }
  mapStore.removeLayer(id); //移除图例
};
/**
 * 根据id来移除primitive对象
 * @param id 图层id
 * @param viewer
 */
function removePrimitiveById(id: String, viewer: any = window.Viewer) {
  const layer = getprimitiveById(id);
  layer && viewer.scene.primitives.remove(layer);
}
/**
 * 根据id获取指定的primitive对象
 * @param id 查询id
 * @param viewer
 * @returns
 */
function getprimitiveById(id: String, viewer: any = window.Viewer) {
  return viewer.scene.primitives._primitives.find((ele: any) => {
    return ele.id === id;
  });
}
/**
 * 添加广告版图层
 * @param item 待添加对象参数
 * @param datas 待添加数据集合
 */
function addBillboard(item: any, datas: any[]) {
  if (getprimitiveById(item.id))
    throw new Error('添加的图层对象必须要有唯一的id，当前id已被占用');
  const viewer = window.Viewer;
  const billboardCollection = viewer.scene.primitives.add(
    new Cesium.BillboardCollection()
  );
  const id = item.id;
  billboardCollection.id = id; //方便后续根据id来获取对象
  const img = getImage('map/' + item.icon + '.png');
  console.log(datas);
  datas.forEach((ele) => {
    getHeigthByDegrees(ele.lng, ele.lat, (pos: any) => {
      const billboard = billboardCollection.add({
        id: radomId(),
        position: Cesium.Cartesian3.fromDegrees(
          ele.lng,
          ele.lat,
          pos[0].height
        ),
        image: img,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(1.5e1, 1.8, 2.0e5, 0.8),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          1.0,
          2.0e5
        ),
      });
      billboard.typeName = id; //添加typeName是为了便于点击获取对象的时候，知晓当前点击对象所属数据集
      billboard.layerProperties = ele;
    });
  });
}
/**
 * 加载涪陵区边界数据
 */
function loadBoundary() {
  getBoundary()
    .then((res) => {
      const promise = Cesium.GeoJsonDataSource.load(res.data);
      promise
        .then((dataSource: any) => {
          const entities = dataSource.entities.values;
          for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const positions = entity.polyline.positions.getValue();
            initBoundary(positions);
            getHeightByPositions(positions, (res: cartographic[]) => {
              let wall = new Cesium.WallGeometry({
                positions: positions,
                granularity: Cesium.Math.RADIANS_PER_DEGREE,
                // 一种与位置平行的数组，在位置处给出墙的最大高度。如果未定义，则使用每个位置的高度。
                maximumHeights: res.map((item) => {
                  return item.height;
                }),
                // 一种与位置平行的数组，用于指定位置处的墙的最小高度。如果未定义，则每个位置的高度为0.0
                minimumHeights: new Array(positions.length).fill(-1600),
                ellipsoid: Cesium.Ellipsoid.WGS84,
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
              });

              let wallInstance = new Cesium.GeometryInstance({
                geometry: wall,
                id: 'wall',
                attributes: {
                  color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                    Cesium.Color.fromCssColorString('rgba(0,255,255,0.3)')
                  ),
                  show: new Cesium.ShowGeometryInstanceAttribute(true),
                },
              });

              window.Viewer.scene.primitives.add(
                new Cesium.Primitive({
                  geometryInstances: wallInstance,
                  appearance: new Cesium.PerInstanceColorAppearance({
                    translucent: false,
                    closed: false,
                  }),
                })
              );
            });
          }
        })
        .catch((err: any) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
}
/**
 * 设置初始化地球时的参数
 */
function initGlobeParame() {
  const viewer = window.Viewer;
  viewer.scene.sun.show = false;
  viewer.scene.moon.show = false;
  viewer.scene.skyBox.show = false; //关闭天空盒，否则会显示天空颜色
  viewer.scene.undergroundMode = true;
  viewer.scene.globe.show = true;
  viewer.scene.backgroundColor = new Cesium.Color(0, 0, 0, 0);
  viewer.scene.skyAtmosphere.show = false;
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    //判断是否支持图像渲染像素化处理
    viewer.resolutionScale = window.devicePixelRatio;
  }
  viewer.scene.fxaa = true;
  viewer.scene.postProcessStages.fxaa.enabled = true;
  homeView();
}
/**
 * 创建地图遮罩，突显局部地图
 * @param positions
 */
function initBoundary(positions: any) {
  const viewer = window.Viewer;
  let polygon = new Cesium.PolygonGeometry({
    polygonHierarchy: new Cesium.PolygonHierarchy(
      Cesium.Cartesian3.fromDegreesArray([
        106.0, 28.0, 106.0, 31.0, 109.0, 31.0, 109.0, 28.0,
      ]),
      [new Cesium.PolygonHierarchy(positions)]
    ),
  });

  let polygonInstance = new Cesium.GeometryInstance({
    geometry: polygon,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.BLACK
      ),
      show: new Cesium.ShowGeometryInstanceAttribute(true),
    },
  });
  viewer.scene.primitives.add(
    new Cesium.GroundPrimitive({
      geometryInstances: polygonInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        translucent: true, //false时透明度无效
        closed: false,
      }),
    })
  );
  initGlobeParame();
}

function initGlobeHandler(viewer: any = window.Viewer) {
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (event: any) {
    // 获取 pick 拾取对象，pick可以拾取entities，primitive和3dtiles
    const pick = viewer.scene.pick(event.position);
    if (Cesium.defined(pick)) {
      console.log('拾取到对象：', pick);
      // 判断是不是primitive对象
      if (pick.primitive && pick.primitive.typeName) {
        const options = {
          px: event.position,
          type: pick.primitive.typeName,
          id: pick.primitive.id,
          properties: pick.primitive.layerProperties,
        };
        mapStore.updateShowPop(true, options);
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
function getLocation() {
  const viewer = window.Viewer;
  let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (event: any) {
    let earthPosition = viewer.scene.pickPosition(event.position);
    if (Cesium.defined(earthPosition)) {
      let cartographic = Cesium.Cartographic.fromCartesian(earthPosition);
      let lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
      let lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
      let height = cartographic.height.toFixed(2);
      console.log(earthPosition, {
        lon: lon,
        lat: lat,
        height: height,
      });
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
