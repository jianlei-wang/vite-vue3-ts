import request from '@/utils/request';

export const GetLayerList = () => {
  return request.get('/api/layerTree');
};

export const getBoundary = () => {
  return request.get('/api/layers/boundary');
};
