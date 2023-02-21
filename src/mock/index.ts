import { MockMethod } from 'vite-plugin-mock';
import { HomeApi } from './home';
import { LoginApi } from './login';
import { HomeMapApi } from './modules/home-map';
import { MapLayerApi } from './modules/map-layers';

const mock: Array<MockMethod> = [
  ...LoginApi,
  ...HomeApi,
  ...HomeMapApi,
  ...MapLayerApi,
];

export default mock;
