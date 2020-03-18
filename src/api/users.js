import request from './request'
import { saveLoginToken } from '../utils/storage'
// TODO 处理下storage的问题，放在API里面怪怪的

const users = {
  getLoginToken: async (name, pass) => {
    const data = await request.get('/token', {
      auth: {
        username: name,
        password: pass
      }
    })
    saveLoginToken(data.data.token)
    return data
  }
}

export default users
