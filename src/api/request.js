import axios from 'axios'
import { loadLoginToken, saveLoginToken } from '../utils/storage'
import { forceReloadWindow } from 'src/utils/forceReloadWindow'
import { editorUiStore } from 'src/stores/editorUiStore'

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
  if (err.response) {
    err.response.message = err.response.data.message
    if (err.response.status === 401) {
      console.error('Login expire')
      saveLoginToken('')
      editorUiStore.confirm('登录过期', '请重新登录', '转到登录页面', 'red', '稍等，我需要保存数据', null, 'ok', forceReloadWindow)
    }
  }
  return Promise.reject(err.response || err)
})

export default request
