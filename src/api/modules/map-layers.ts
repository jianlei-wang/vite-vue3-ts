import request from '@/utils/request';

export const GetLayerById = (id: String) => {
  let url = '';
  switch (id) {
    case 'fire_monitor_station':
      url = '/api/layers/station';
      break;
    case 'fire_monitor_video':
      url = '/api/layers/video';
      break;
    case 'fire_brigade':
      url = '/api/layers/brigade';
      break;
    case 'material_reserve':
      break;
    case 'fire_pool':
      break;
    case 'fire_checkpoint':
      break;
    case 'intelligent_gateway':
      break;
    case 'water_source':
      break;
    case 'barrier_band':
      break;
    case 'emergency_access':
      break;
    case 'patrol_road':
      break;
    default:
      break;
  }
  return request.get(url);
};
