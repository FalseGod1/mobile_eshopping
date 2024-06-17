//引入axios组件
import axios from 'axios'
//引入element-plus组件
// import { ElLoading, ElMessage } from 'element-plus'
import { showLoadingToast } from 'vant'
import Cookies from 'js-cookie'

//2. 创建axios实例
const instance = axios.create({
  baseURL: 'http://1.94.14.36/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: 'Bearer'
  },
  timeout: 30000
})
let toast
//3.配置请求拦截器
instance.interceptors.request.use(
  (config) => {
    toast = showLoadingToast({
      message: '加载中...',
      forbidClick: true
    })
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = Cookies.get('Token')
    if (token != null) {
      config.headers.Authorization = token
    }
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === 'POST') {
      config.data = JSON.stringify(config.data)
    }
    return config
  },
  (err) => Promise.reject(err)
)
//4.配置响应拦截器
instance.interceptors.response.use(
  (res) => {
    toast.close()
    return res.data
  },
  (error) => {
    console.log(error)
    //响应错误
    if (error.response && error.response.status) {
      const status = error.response.status
      console.log(status)
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default instance
