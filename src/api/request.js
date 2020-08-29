import axios from 'axios'
import { loadLoginToken, loadRefreshToken, saveRefreshToken, saveLoginToken } from '../utils/storage'
import { forceReloadWindow } from 'src/utils/url'
import users from './users'
import { Logger } from 'src/utils/logger'
import message from 'src/utils/message'
import { confirmDialog } from 'src/utils/dialog'
const logger = new Logger({ prefix: 'Request' })

const request = axios.create()
if (process.env.DEV) {
  request.defaults.baseURL = '/api'
} else {
  request.defaults.baseURL = window.location.origin
}
request.defaults.headers['Content-Type'] = 'application/json'
request.interceptors.request.use((config) => {
  logger.log(config.method.toUpperCase(), config.url)
  const token = loadLoginToken()
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})
request.interceptors.response.use((res) => {
  return Promise.resolve(res.data)
}, async (err) => {
  if (err.response) {
    err.response.message = err.response.data.message
    err.code = err.response.status
    if (err.response.status === 401) {
      logger.log('access token expire')
      await users.refreshToken()
      err.config.url = err.config.url.slice(err.config.baseURL.length)
      return request(err.config)
    }
    return Promise.reject(err)
  }
  return Promise.reject(err)
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
}, async (err) => {
  if (err.response) {
    err.response.message = err.response.data.message
    if (err.response.status === 401) {
      logger.log('refresh token expire')
      saveLoginToken('')
      saveRefreshToken('')
      message.error({ message: '登录过期，即将跳转到登录页', position: 'bottom', progress: true })
      // return new Promise(resolve => {
      //   window.setTimeout(() => {
      //     forceReloadWindow()
      //     resolve()
      //   }, 3000)
      // })
      await confirmDialog('登录过期', '开发阶段可能丢失数据，请确认数据完整或手动保存后重新登录', '放弃数据并转到登录页面', 'red', '稍等，我需要保存数据', null, 'ok', forceReloadWindow)
    }
  }
  return Promise.reject(err.response || err)
})

export { request, refresh }
