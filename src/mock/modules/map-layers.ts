import { MockMethod } from 'vite-plugin-mock';
import { stationLayer, VideoLayer, brigadeLayer } from '../datas/index';
export const MapLayerApi: Array<MockMethod> = [
  {
    url: '/api/layers/station',
    method: 'get',
    response: () => {
      return {
        msg: 'OK',
        code: 200,
        data: {
          type: 'billboard',
          items: stationLayer,
        },
      };
    },
  },
  {
    url: '/api/layers/video',
    method: 'get',
    response: () => {
      return {
        msg: 'OK',
        code: 200,
        data: {
          type: 'billboard',
          items: VideoLayer,
        },
      };
    },
  },
  {
    url: '/api/layers/brigade',
    method: 'get',
    response: () => {
      return {
        msg: 'OK',
        code: 200,
        data: {
          type: 'billboard',
          items: brigadeLayer,
        },
      };
    },
  },
];
