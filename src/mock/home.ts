import { MockMethod } from 'vite-plugin-mock';

export const HomeApi: Array<MockMethod> = [
  {
    url: '/api/routerList',
    method: 'get',
    response: () => {
      const routes = [
        {
          path: '/main/HomeMap',
          name: '森林防火一张图',
          component: 'HomeMap.vue',
        },
        {
          path: '/main/FireMonitor',
          name: '火情监测',
          component: 'FireMonitor.vue',
        },

        {
          path: '/main/VideoMonitor',
          name: '视频监控',
          component: 'VideoMonitor.vue',
        },
        {
          path: '/main/ForecastWarning',
          name: '预报预警',
          component: 'ForecastWarning.vue',
        },
        {
          path: '/main/EmergencyCommand',
          name: '应急指挥',
          component: 'EmergencyCommand.vue',
        },
        {
          path: '/main/DamageAssessment',
          name: '灾损评估',
          component: 'DamageAssessment.vue',
        },
      ];

      return {
        msg: 'OK',
        code: 200,
        data: routes,
      };
    },
  },
];
