import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 40000,
  headers: { 
    'Content-type': 'application/json;charset=UTF-8'
  },
  responseType: 'json',
  withCredentials: false  
})



// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 添加请求头
  // config.headers.post['Content-type'] = 'application/json;charset=UTF-8'
  // if(getToken()){
  //   config.headers.post['token'] = getToken()
  // }
  return config
})

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
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