import { request, refresh } from './request'
import { saveLoginToken, saveRefreshToken } from '../utils/storage'
// TODO 处理下storage的问题，放在API里面怪怪的

import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'request/users' })

const users = {
  getLoginToken: async (name, pass) => {
    logger.log('getLoginToken')
    const data = await request.post('/auth/token', {
      auth: {
        username: name,
        password: pass
      }
    })
    saveLoginToken(data.data.token)
    saveRefreshToken(data.data.refreshToken)
    return data
  },
  refreshToken: async () => {
    logger.log('refreshToken')
    const data = await refresh.post('/auth/refresh')
    saveLoginToken(data.data.token)
    return data
  },
  listAPIKEY: async () => {
    logger.log('listAPIKEY')
    const data = await request.get('/auth/apikeys')
    return data.data.apikeys
  },
  requestAPIKEY: async () => {
    logger.log('requestAPIKEY')
    const data = await request.post('/auth/apikeytoken')
    return data.data.token
  },
  removeAPIKEY: async (issuedAt) => {
    logger.log('requestAPIKEY')
    return request.delete('/auth/apikey', { data: { issuedAt } })
  }
}

export default users
