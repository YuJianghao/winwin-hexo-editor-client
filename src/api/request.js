import axios from 'axios'
import { loadLoginToken } from '../utils/storage'

// TODO 404和500错误的统一处理
const request = axios.create()

request.defaults.baseURL = process.env.HEXO_SERVER_ROOT
request.defaults.headers['Content-Type'] = 'application/json'
request.interceptors.request.use((config) => {
  const token = loadLoginToken()
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})
request.interceptors.response.use((res) => {
  return Promise.resolve(res.data)
}, (err) => {
  if (err.response) err.response.message = err.response.data.message
  return Promise.reject(err.response || err)
})

export default request
