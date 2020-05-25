import axios from 'axios'
import { loadLoginToken, saveLoginToken } from '../utils/storage'
import { forceReloadWindow } from 'src/utils/forceReloadWindow'
import { confirmDialog } from 'src/utils/dialog'

const request = axios.create()

if (process.env.DEV) {
  request.defaults.baseURL = '/api'
} else {
  request.defaults.baseURL = window.location.origin
}
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
      saveLoginToken('')
      confirmDialog('登录过期', '开发阶段可能丢失数据，请确认数据完整或手动保存后重新登录', '放弃数据并转到登录页面', 'red', '稍等，我需要保存数据', null, 'ok', forceReloadWindow)
    }
  }
  return Promise.reject(err.response || err)
})

export default request
