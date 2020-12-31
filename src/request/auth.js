import API from '@/constants/api';
import request from '@/request';

export function login(data){
  return request.post(API.LOGION, data)
}

export function getCurrentUserInfo(){
  return request.get(API.CURRENT_USER)
}