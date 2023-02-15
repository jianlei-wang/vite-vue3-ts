import request from '@/utils/request';

export const GetDynamicRoutes = () => {
  return request.get('/api/routerList');
};
