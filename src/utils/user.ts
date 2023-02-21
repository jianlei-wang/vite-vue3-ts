import router from '@/router';
import { captchaImage, login } from '@/api/login';
import { setLocalStorage } from './localstorage';
import { useHomeStore } from '@/store/modules/home';

const homeStore = useHomeStore();
/**
 * 获取登录验证码
 * @param callback 回调函数
 */
export const getCaptchaImg = (callback: Function) => {
  captchaImage()
    .then((res) => {
      callback && typeof callback === 'function' && callback(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

/**
 * 用户登录
 * @param options
 */
export const sighIn = (options: {
  user: String;
  pass: String;
  code: String;
}) => {
  login()
    .then((res) => {
      homeStore.updateUser(options.user);
      setLocalStorage('LH_TOKEN', res.token);
      router.push('/');
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const logOut = () => {
  setLocalStorage('LH_TOKEN');
  router.push('/login');
};
