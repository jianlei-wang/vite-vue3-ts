import request from '@/utils/request';

export const captchaImage = () => {
  return request.get('/api/captchaImage');
};
export const login = () => {
  return request.post('/api/login');
};
