import sha1 from 'crypto-js/sha1'
import { LocalStorage } from 'quasar'
import { origin, request } from './request'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/utils/constants'
export default {
  login: async (name, pass) => {
    const res = await origin.post('/login', undefined, {
      auth: {
        username: name,
        password: sha1(pass).toString()
      }
    })
    LocalStorage.set(ACCESS_TOKEN_KEY, res.data.data.accessToken)
    LocalStorage.set(REFRESH_TOKEN_KEY, res.data.data.refreshToken)
    return res.data
  },
  info: async () => {
    return request.get('/info')
  },
  logout: async () => {
    return request.post('/logout')
  },
  refresh: async () => {
    const res = await origin.post('/refresh', undefined, {
      headers: {
        Authorization: 'Bearer ' + LocalStorage.getItem(REFRESH_TOKEN_KEY)
      }
    })
    LocalStorage.set(ACCESS_TOKEN_KEY, res.data.data.accessToken)
    LocalStorage.set(REFRESH_TOKEN_KEY, res.data.data.refreshToken)
  },
}
