import API from '@/constants/api';
import request from '@/request';

export function login(data){
  return request.post(API.LOGION, data)
}