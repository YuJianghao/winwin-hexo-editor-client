import { request } from '../request'
export default {
  getUserInfo: async () => {
    const res = await request.get('/settings/user')
    return res.data.user
  },
  updateUserInfo: async (username, password) => {
    return request.put('/settings/user', { username, password })
  }
}
