import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
//屏幕自适应
import "amfe-flexible/index.js";
// 引入Svg组件
import "virtual:svg-icons-register";
import SvgIcon from "./components/SvgIcon.vue";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .component("SvgIcon", SvgIcon)
  .mount("#app");
