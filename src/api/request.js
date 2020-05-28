import axios from 'axios'
import { loadLoginToken, saveLoginToken, loadRefreshToken, saveRefreshToken } from '../utils/storage'
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
    console.log(err)
    if (err.response.status === 401) {
      saveLoginToken('')
      confirmDialog('登录过期', '开发阶段可能丢失数据，请确认数据完整或手动保存后重新登录', '放弃数据并转到登录页面', 'red', '稍等，我需要保存数据', null, 'ok', forceReloadWindow)
    }
  }
  return Promise.reject(err.response || err)
})

const refresh = axios.create()

if (process.env.DEV) {
  refresh.defaults.baseURL = '/api'
} else {
  refresh.defaults.baseURL = window.location.origin
}
refresh.defaults.headers['Content-Type'] = 'application/json'
refresh.interceptors.request.use((config) => {
  const token = loadRefreshToken()
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})
refresh.interceptors.response.use((res) => {
  return Promise.resolve(res.data)
}, (err) => {
  if (err.response) {
    err.response.message = err.response.data.message
    console.log(err)
    if (err.response.status === 401) {
      saveRefreshToken('')
      confirmDialog('登录过期', '开发阶段可能丢失数据，请确认数据完整或手动保存后重新登录', '放弃数据并转到登录页面', 'red', '稍等，我需要保存数据', null, 'ok', forceReloadWindow)
    }
  }
  return Promise.reject(err.response || err)
})

export { request, refresh }
