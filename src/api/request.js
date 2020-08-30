import axios from 'axios'
import { loadLoginToken, loadRefreshToken, saveRefreshToken, saveLoginToken } from '../utils/storage'
import { forceReloadWindow } from 'src/utils/url'
import users from './users'
import { Logger } from 'src/utils/logger'
import message from 'src/utils/message'
import dialogService from 'src/service/DialogService'
import * as DialogTypes from 'src/service/DialogService/dialog-types'
const loggerRTC = new Logger({ prefix: 'RequestTokenCollection' })
class RequestTokenCollection {
  constructor () {
    this._data = {}
  }

  _genKey (method, url) {
    return method.toUpperCase() + encodeURIComponent(url)
  }

  _hasRequest (key) {
    return Object.keys(this._data).includes(key)
  }

  addRequest (method, url) {
    loggerRTC.log('START', method.toUpperCase(), url)
    const key = this._genKey(method, url)
    if (this._hasRequest(key)) {
      loggerRTC.log('ABORT', this._data[key].method.toUpperCase(), this._data[key].url)
      this._data[key].cancel()
    }
    const source = axios.CancelToken.source()
    this._data[key] = {
      method,
      url,
      token: source.token,
      cancel: source.cancel
    }
    return source.token
  }

  removeRequest (method, url) {
    if (this._hasRequest(this._genKey(method, url))) {
      loggerRTC.log('END', method.toUpperCase(), url)
      delete this._data[this._genKey(method, url)]
    }
  }
}

const logger = new Logger({ prefix: 'Request' })
const request = axios.create()
const requestRTC = new RequestTokenCollection()
if (process.env.DEV) {
  request.defaults.baseURL = '/api'
} else {
  request.defaults.baseURL = window.location.origin
}
request.defaults.headers['Content-Type'] = 'application/json'
request.interceptors.request.use((config) => {
  logger.log(config.method.toUpperCase(), config.url)
  if (!config.noAsyncRace) {
    config.cancelToken = requestRTC.addRequest(config.method, config.url)
  }
  const token = loadLoginToken()
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})
request.interceptors.response.use((res) => {
  requestRTC.removeRequest(res.config.method, res.config.url.slice(res.config.baseURL.length))
  return Promise.resolve(res.data)
}, async (err) => {
  if (!err.config) {
    const e = new Error()
    e.name = 'AsyncRaceAbort'
    e.message = ''
    throw e
  }
  requestRTC.removeRequest(err.config.method, err.config.url.slice(err.config.baseURL.length))
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

      const { type } = await dialogService.create(DialogTypes.ConfirmDialog, {
        title: '登录过期',
        message: '开发阶段可能丢失数据，请确认数据完整或手动保存后重新登录',
        okLabel: '放弃数据并转到登录页面',
        okColor: 'red',
        cancelLabel: '稍等，我需要保存数据',
        cancelColor: 'primary',
        focus: 'ok'
      })
      if (type !== 'ok') return
      forceReloadWindow()
    }
  }
  return Promise.reject(err.response || err)
})

export { request, refresh }
