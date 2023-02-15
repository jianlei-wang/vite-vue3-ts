import { defineStore } from 'pinia';
import { storeHome } from '../types/home';

let modules = import.meta.glob('../../views/modules/*.vue');

export const useHomeStore = defineStore('index', {
  state: (): storeHome => {
    return {
      //路由表
      routes: [],
    };
  },
  getters: {},
  actions: {
    updateRoutes(data: Array<any>, router: any) {
      this.routes = [];
      data.forEach((el) => {
        this.routes.push({
          path: el.path,
          name: el.name,
          component: modules[`../../views/modules/${el.component}`],
        });
      });
      this.routes.forEach((el) => {
        router.addRoute('Home', el);
        // router.addRoute();
      });
    },
  },
});
