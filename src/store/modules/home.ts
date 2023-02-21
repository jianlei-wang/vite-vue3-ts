import { defineStore } from 'pinia';
import { storeHome } from '../types/home';

let modules = import.meta.glob('../../views/modules/*.vue');

export const useHomeStore = defineStore('home', {
  state: (): storeHome => {
    return {
      routes: [],
      userName: 'undefined',
    };
  },
  getters: {
    curUser(state) {
      return state.userName;
    },
  },
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
      });
    },
    updateUser(name: String) {
      this.userName = name;
    },
  },
  // 使用pinia-plugin-persist插件，开启数据缓存，持久化配置
  persist: {
    //这里存储默认使用的是session
    enabled: true,
    strategies: [
      {
        //key的名称
        key: 'LH_PINIA_SESSION',
        //更改默认存储，我更改为localStorage
        storage: localStorage,
        // 可以选择哪些进入local存储，这样就不用全部都进去存储了，默认是全部进去存储
        paths: ['userName'],
      },
    ],
  },
});
