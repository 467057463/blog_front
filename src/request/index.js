import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: ""
})

// const axiosInstance = axios.create({
  // baseURL: process.env.API_BASE_URL,
  // timeout: 40000,
  // headers: { 
  //   'Content-type': 'application/json;charset=UTF-8'
  // },
  // responseType: 'json',
  // withCredentials: false  
// })

// 添加请求拦截器
// axiosInstance.interceptors.request.use(config => {
//   // 添加请求头
//   // config.headers.post['Content-type'] = 'application/json;charset=UTF-8'
//   // if(getToken()){
//   //   config.headers.post['token'] = getToken()
//   // }
//   return config
// })

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    let result = response
    // if (result.code === 0) {
    //   return result.result
    // } else if (
    //   response.headers['content-type'] ===
    //   'application/vnd.ms-excel;charset=utf-8'
    // ) {
    //   // 文件流下载
    //   return result
    // } else {
    //   if (String(result.code) === '401') {
    //     alert('登陆失效，请重新登陆', '请求失败').then(() => {
    //       window.location = `${process.env.VUE_APP_LOGIN_URL}?callback=${process.env.VUE_APP_APP_URL}`
    //     })
    //   } else {
    //     if (String(result.code) === '500') {
    //       errorMessage(result.msg)
    //     } else {
    //       errorMessage(result.msg + `（${result.code}）`)
    //     }
    //     return Promise.reject(result)
    //   }
    // }
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