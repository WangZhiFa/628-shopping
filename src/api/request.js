import axios from 'axios'
import store from '@/store';
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// axios.create()创建一个axios实例
const $request = axios.create({
  baseURL: '/api',
  // 请求超时时间
  timeout: 5000
})

$request.interceptors.request.use(config => {
  // config配置对象 里面有header请求头
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if (localStorage.getItem('TOKEN')) {
    config.headers.token = localStorage.getItem('TOKEN')
  }
  nProgress.start()
  return config
})

$request.interceptors.response.use(
  res => {
    nProgress.done()
    return res.data
  },
  error => {
    return error
  }
)

export default $request
