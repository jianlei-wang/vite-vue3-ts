import { MockMethod } from 'vite-plugin-mock';
import { HomeApi } from './home';
import { LoginApi } from './login';

const mock: Array<MockMethod> = [...LoginApi, ...HomeApi];

export default mock;
