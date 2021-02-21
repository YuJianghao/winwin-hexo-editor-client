import axios from 'axios'
import { LocalStorage } from 'quasar'
import Store from 'src/store'
import Router from '../router'
import { ACCESS_TOKEN_KEY } from 'src/utils/constants'
import api from '.'
class NetworkError extends Error {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this)
    this.name = 'Network Error'
  }
}

const BASEURL = process.env.DEV ? '/api' : window.location.origin

const origin = axios.create()
origin.defaults.headers['Content-Type'] = 'application/json'
origin.defaults.baseURL = BASEURL

origin.interceptors.response.use(res => res, err => {
  throw new NetworkError(err.response.data.message || err.message)
})

const request = axios.create()
request.defaults.headers['Content-Type'] = 'application/json'
request.defaults.baseURL = BASEURL

request.interceptors.request.use((config) => {
  const token = LocalStorage.getItem(ACCESS_TOKEN_KEY)
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})

request.interceptors.response.use(res => res, async err => {
  if (err.response && err.response.status === 401) {
    try {
      await api.auth.refresh()
      err.config.url = err.config.url.slice(err.config.baseURL.length)
      return request(err.config)
    } catch (e) {
      Store.dispatch('user/logout', true)
      if (Router.app.$route.path !== '/login')
        Router.push('/login')
      throw err
    }
  } else throw new NetworkError(err.response.data.message || err.message)
})

export { origin, request, NetworkError }
