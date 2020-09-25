import { request } from '../request'
export default {
  getUserInfo: async () => {
    const res = await request.get('/settings/user')
    return res.data.user
  },
  updateUserInfo: async (username, oldpassword, password) => {
    return request.put('/settings/user', { username, oldpassword, password })
  },
  getUserInfoById: async id => {
    const res = await request.get('/settings/user/' + id)
    return res.data.user
  },
  updateUserInfoById: async (id, username, password) => {
    return request.put('/settings/user/' + id, { username, password })
  }
}
