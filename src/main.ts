import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

//引入状态管理器
import { createPinia } from 'pinia';
// 引入pinia持久化插件
import piniaPluginPersist from 'pinia-plugin-persist';

// 引入字体包
import './assets/fonts/fonts.css';

//屏幕自适应
import 'amfe-flexible/index.js';

// 引入Svg组件
import 'virtual:svg-icons-register';
import SvgIcon from './components/SvgIcon.vue';

const pinia = createPinia();
pinia.use(piniaPluginPersist);

createApp(App)
  .use(router)
  .use(pinia)
  .component('SvgIcon', SvgIcon)
  .mount('#app');
