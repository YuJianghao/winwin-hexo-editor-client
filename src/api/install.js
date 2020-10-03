import axios from 'axios'
const request = axios.create()

if (process.env.DEV) {
  request.defaults.baseURL = '/api'
} else {
  request.defaults.baseURL = window.location.origin
}
request.defaults.headers['Content-Type'] = 'application/json'

export default {
  checkInstalled: async () => {
    return request.get('/install/info')
  },
  do: async (data) => {
    return request.post('/install/do', data)
  }
}
