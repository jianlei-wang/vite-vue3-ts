import { MockMethod } from 'vite-plugin-mock';

export const HomeApi: Array<MockMethod> = [
  {
    url: '/api/routerList',
    method: 'get',
    response: () => {
      const routes = [
        {
          path: '/main/PageOne',
          name: 'PageOne',
          component: 'PageOne.vue',
        },
        {
          path: '/main/PageTwo',
          name: 'PageTwo',
          component: 'PageTwo.vue',
        },
        {
          path: '/main/PageThree',
          name: 'PageThree',
          component: 'PageThree.vue',
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
