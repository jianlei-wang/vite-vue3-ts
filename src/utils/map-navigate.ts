const Cesium = window.Cesium;
export const homeView = () => {
  window.Viewer.camera.setView({
    destination: new Cesium.Cartesian3(
      -1677710.837696297,
      5377242.00815029,
      3095242.3515593545
    ),
    orientation: {
      heading: 6.202995637444507,
      pitch: -0.6555325207021148,
      roll: 0.000005674302140157295,
    },
  });
  // window.Viewer.scene.screenSpaceCameraController.minimumZoomDistance = 100;
  // window.Viewer.scene.screenSpaceCameraController.maximumZoomDistance = 100000;
};
export const flyTo = (
  degrees: { x: Number; y: Number },
  height: Number = 100000,
  heading: Number = 0,
  pitch: Number = -90,
  roll: Number = 0,
  time: Number = 2
) => {
  const viewer = window.Viewer;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(degrees.x, degrees.y, height),
    orientation: {
      heading: Cesium.Math.toRadians(heading), // 水平偏角，默认正北 0
      pitch: Cesium.Math.toRadians(pitch), // 俯视角，默认-90，垂直向下
      roll: roll, // 旋转角
    },
    duration: time,
  });
};
