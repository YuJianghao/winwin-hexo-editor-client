import { SHA1 } from 'crypto-js'
import axios from 'axios'
import { LocalStorage } from 'quasar'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/utils/constants'
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
    return axios.get('/pages')
  },
  refresh: async () => {
    const res = await axios.post('/refresh')
    LocalStorage.set(ACCESS_TOKEN_KEY, res.data.data.accessToken)
    LocalStorage.set(REFRESH_TOKEN_KEY, res.data.data.refreshToken)
  },
}
