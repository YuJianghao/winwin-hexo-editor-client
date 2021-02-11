import axios from 'axios'
import auth from './auth'
import { forceReloadWindow } from 'src/utils/common'
import { LocalStorage } from 'quasar'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/utils/constants'
import { Logger } from 'src/utils/logger'
const loggerRTC = new Logger({ prefix: 'RTC' })
class RequestTokenCollection {
  constructor() {
    this._data = Object.create(null)
  }

  _genKey(method, url) {
    return method.toUpperCase() + encodeURIComponent(url)
  }

  _hasRequest(key) {
    return Object.keys(this._data).includes(key)
  }

  addRequest(method, url) {
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

  removeRequest(method, url) {
    if (this._hasRequest(this._genKey(method, url))) {
      loggerRTC.log('END', method.toUpperCase(), url)
      delete this._data[this._genKey(method, url)]
    }
  }
}

const logger = new Logger({ prefix: 'Request' })
const request = axios.create()
const requestRTC = new RequestTokenCollection()
const BASE_URL = process.env.DEV ? '/api' : window.location.origin
request.defaults.baseURL = BASE_URL
request.defaults.headers['Content-Type'] = 'application/json'
request.interceptors.request.use((config) => {
  // 如果不用需要在config指定noAsyncRace
  if (!config.noAsyncRace) {
    config.cancelToken = requestRTC.addRequest(config.method, config.url)
  }
  const token = LocalStorage.getItem(ACCESS_TOKEN_KEY)
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})
request.interceptors.response.use((res) => {
  requestRTC.removeRequest(res.config.method, res.config.url.slice(res.config.baseURL.length))
  return Promise.resolve(res)
}, async (err) => {
  if (!err.config) {
    const e = new Error()
    e.name = 'AsyncRaceAbort'
    e.message = ''
    throw e
  }
  requestRTC.removeRequest(err.config.method, err.config.url.slice(err.config.baseURL.length))
  if (err.response && err.response.status === 401) {
    logger.log('access token expire')
    await auth.refresh()
    err.config.url = err.config.url.slice(err.config.baseURL.length)
    return request(err.config)
  }
  return Promise.reject(err)
})

const refresh = axios.create()
refresh.defaults.baseURL = BASE_URL
refresh.defaults.headers['Content-Type'] = 'application/json'
refresh.interceptors.request.use((config) => {
  const token = LocalStorage.getItem(REFRESH_TOKEN_KEY)
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
      LocalStorage.set(ACCESS_TOKEN_KEY, '')
      LocalStorage.set(REFRESH_TOKEN_KEY, '')
      forceReloadWindow()
      return
    }
  }
  return Promise.reject(err.response || err)
})

export { request, refresh }
