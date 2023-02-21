import boundary from './layers/boundary.json';
//工程数对象模拟
const projecttreeItems = [
  {
    id: 'fire_monitor_station',
    name: '森林火险监测站',
    icon: 'station',
    defaultChecked: true,
    legends: [
      {
        name: '森林火险监测站',
        img: 'station',
      },
    ],
    type: 'billboard',
    count: 5,
  },
  {
    id: 'fire_monitor_video',
    name: '林火视频监控点',
    icon: 'video',
    defaultChecked: false,
    legends: [
      {
        name: '林火视频监控点',
        img: 'video',
      },
    ],
    type: 'billboard',
    count: 13,
  },
  {
    id: 'fire_brigade',
    name: '森林消防专业队伍',
    icon: 'brigade',
    defaultChecked: false,
    legends: [
      {
        name: '森林消防专业队伍',
        img: 'brigade',
      },
    ],
    type: 'billboard',
    count: 4,
  },
  {
    id: 'material_reserve',
    name: '森林防火物资储备库',
    icon: 'repository',
    defaultChecked: false,
    legends: [
      {
        name: '森防物资储备库',
        img: 'repository',
      },
    ],
    type: 'billboard',
    count: 29,
  },
  {
    id: 'fire_pool',
    name: '森林消防水池',
    icon: 'pool',
    defaultChecked: false,
    legends: [
      {
        name: '森林消防水池',
        img: 'pool',
      },
    ],
    type: 'billboard',
    count: 11,
  },
  {
    id: 'fire_checkpoint',
    name: '防火检查站',
    icon: 'checkpoint',
    defaultChecked: false,
    legends: [
      {
        name: '防火检查站',
        img: 'checkpoint',
      },
    ],
    type: 'billboard',
    count: 17,
  },
  {
    id: 'intelligent_gateway ',
    name: '智能防火卡口',
    icon: 'gateway',
    defaultChecked: false,
    legends: [
      {
        name: '智能防火卡口',
        img: 'gateway',
      },
    ],
    type: 'billboard',
    count: 26,
  },
  {
    id: 'water_source',
    name: '水源地',
    icon: 'water',
    defaultChecked: false,
    legends: [
      {
        name: '水源地',
        img: 'water',
      },
    ],
    type: 'billboard',
    count: 32,
  },
  {
    id: 'barrier_band',
    name: '组合阻隔带',
    icon: 'barrier',
    defaultChecked: false,
    legends: [
      {
        name: '组合阻隔带',
        img: 'barrier',
      },
    ],
    type: 'billboard',
    count: 7,
  },
  {
    id: 'emergency_access',
    name: '防火（应急）通道',
    icon: 'access',
    defaultChecked: false,
    legends: [
      {
        name: '防火（应急）通道',
        img: 'access',
      },
    ],
    type: 'billboard',
    count: 23,
  },
  {
    id: 'patrol_road',
    name: '巡护便道',
    icon: 'road',
    defaultChecked: false,
    legends: [
      {
        name: '巡护便道',
        img: 'road',
      },
    ],
    type: 'billboard',
    count: 11,
  },
];
//火险监测站模拟数据
const getStation = () => {
  const positions: any[] = [
    { lng: 107.10731, lat: 29.57339 },
    { lng: 107.26493, lat: 29.53383 },
    { lng: 107.26372, lat: 29.79352 },
    { lng: 107.52581, lat: 29.80086 },
    { lng: 107.59034, lat: 29.57085 },
  ];
  positions.map((item, index) => {
    const id = '00' + index;
    item.id = id;
    item.name = '火险监测站' + id;
    item.location = '涪陵区XXXXXXXXXX';
    item.type = '火险监测站';
  });
  return positions;
};
const stationLayer = getStation();
//林火视频监控点模拟数据
const getVideo = () => {
  const positions: any[] = [
    { lng: '107.14278', lat: '29.53729' },
    { lng: '107.07739', lat: '29.46465' },
    { lng: '107.02573', lat: '29.55752' },
    { lng: '107.04724', lat: '29.68915' },
    { lng: '107.26038', lat: '29.49490' },
    { lng: '107.30411', lat: '29.55256' },
    { lng: '107.34796', lat: '29.82390' },
    { lng: '107.29426', lat: '29.79685' },
    { lng: '107.53739', lat: '29.74219' },
    { lng: '107.51060', lat: '29.65569' },
    { lng: '107.57438', lat: '29.51746' },
    { lng: '107.53428', lat: '29.52619' },
    { lng: '107.61724', lat: '29.61730' },
  ];
  positions.map((item, index) => {
    const id = '00' + index;
    item.id = id;
    item.name = '林火视频监控点' + id;
    item.location = '涪陵区XXXXXXXXXX';
    item.type = '林火视频监控点';
  });
  return positions;
};
const VideoLayer = getVideo();

//森林消防专业队伍模拟数据
const getBrigade = () => {
  const positions: any[] = [
    { lng: 107.23343, lat: 29.72209 },
    { lng: 107.2699, lat: 29.75569 },
    { lng: 107.37716, lat: 29.70549 },
    { lng: 107.54883, lat: 29.59149 },
  ];
  positions.map((item, index) => {
    const id = '00' + index;
    item.id = id;
    item.name = '森林消防专业队伍' + id;
    item.location = '涪陵区XXXXXXXXXX';
    item.type = '森林消防专业队伍';
  });
  return positions;
};
const brigadeLayer = getBrigade();
// 气象要素对象模拟
const weatherElements = [{}];
export { boundary, projecttreeItems, stationLayer, VideoLayer, brigadeLayer };
