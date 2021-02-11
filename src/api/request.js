import axios from 'axios'
import { LocalStorage } from 'quasar'
import Store from 'src/store'
import { ACCESS_TOKEN_KEY } from 'src/utils/constants'
import api from '.'
const BASEURL = process.env.DEV ? '/api' : window.location.origin

const origin = axios.create()
origin.defaults.headers['Content-Type'] = 'application/json'
origin.defaults.baseURL = BASEURL

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
    let refreshed = false
    try {
      await api.auth.refresh()
      refreshed = true
    } catch (e) {
      Store.dispatch('user/logout', true)
      // TODO: token刷新失败，跳转路由
      throw err
    }
    if (refreshed) {
      err.config.url = err.config.url.slice(err.config.baseURL.length)
      return request(err.config)
    }
  } else throw err
})

export { origin, request }
