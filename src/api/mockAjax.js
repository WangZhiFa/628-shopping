import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// axios.create()创建一个axios实例
const $mockRequest = axios.create({
  baseURL: '/mock',
  // 请求超时时间
  timeout: 5000
})

$mockRequest.interceptors.request.use(config => {
  // config配置对象 里面有header请求头
  nProgress.start()
  return config
})

$mockRequest.interceptors.response.use(
  res => {
    nProgress.done()
    return res.data
  },
  error => {
    return error
  }
)

export default $mockRequest
