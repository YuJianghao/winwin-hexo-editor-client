import axios from 'axios'
import users from './users'
import { loadLoginToken, loadRefreshToken, saveRefreshToken, saveLoginToken } from 'src/utils/storage'
import { forceReloadWindow } from 'src/utils/common'
import { Logger } from 'src/utils/logger'
const loggerRTC = new Logger({ prefix: 'RTC' })
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
    err.message = err.response.message
    if (err.response.status === 401) {
      if (err.config.headers.Authorization && err.config.headers.Authorization.indexOf('Basic') === -1) {
        logger.log('access token expire')
        await users.refreshToken()
        err.config.url = err.config.url.slice(err.config.baseURL.length)
        return request(err.config)
      }
      err.message = '用户名或密码错误'
    }
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
      forceReloadWindow()
    }
  }
  return Promise.reject(err.response || err)
})

export { request, refresh }
