import { SHA1 } from 'crypto-js'
import axios from 'axios'
import { LocalStorage } from 'quasar'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/utils/constants'
import { request, refresh } from './request'
export default {
  login: async (name, pass) => {
    const res = await axios.post((process.env.DEV ? '/api' : window.location.origin) + '/login', {}, {
      auth: {
        username: name,
        password: SHA1(pass).toString()
      }
    })
    LocalStorage.set(ACCESS_TOKEN_KEY, res.data.data.accessToken)
    LocalStorage.set(REFRESH_TOKEN_KEY, res.data.data.refreshToken)
    return res.data
  },
  logout: async () => {
    return request.get('/pages')
  },
  refresh: async () => {
    const res = await refresh.post('/refresh')
    LocalStorage.set(ACCESS_TOKEN_KEY, res.data.accessToken)
    LocalStorage.set(REFRESH_TOKEN_KEY, res.data.refreshToken)
  },
}
