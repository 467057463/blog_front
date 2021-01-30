import axios from 'axios';
import { getToken } from '@/utils';
import { store } from '@/store';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 40000,
  headers: { 
    'Content-type': 'application/json;charset=UTF-8'
  },
  responseType: 'json',
  withCredentials: false,
  onDownloadProgress(progressEvent){
    const { total, loaded } = progressEvent;
    store.app.setPercent(loaded / total)
  }
})



// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  store.app.progressStart()  
  // 添加token
  if(getToken()){
    config.headers['Authorization'] = `Bearer ${getToken()}`
  }
  return config
})

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    setTimeout(()=>{
      store.app.progressDone()  
    }, 500)
    let result = response
    return result.data
  },
  error => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    let response = error.response
    if (!response) {     
      return Promise.reject('请求超时或网络出错')
    }
    return Promise.reject(error)
  }
)
export default axiosInstance