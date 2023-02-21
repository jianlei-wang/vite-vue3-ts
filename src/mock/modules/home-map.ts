import { MockMethod } from 'vite-plugin-mock';
import { projecttreeItems, boundary } from '../datas/index';
export const HomeMapApi: Array<MockMethod> = [
  {
    url: '/api/layerTree',
    method: 'get',
    response: () => {
      return {
        msg: 'OK',
        code: 200,
        data: projecttreeItems,
      };
    },
  },
  {
    url: '/api/layers/boundary',
    method: 'get',
    response: () => {
      return {
        msg: 'OK',
        code: 200,
        data: boundary,
      };
    },
  },
];
