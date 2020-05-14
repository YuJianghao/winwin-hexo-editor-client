import { loadLoginToken, saveLoginToken } from 'src/utils/storage'
import users from 'src/api/users'

export const loginStore = {
  state: {
    isLoggedIn: false
  },
  async init () {
    this.state.isLoggedIn = !!loadLoginToken()
  },
  async login (username, password) {
    await users.getLoginToken(username, password)
    this.state.isLoggedIn = true
  },
  async logout () {
    saveLoginToken('')
    this.state.isLoggedIn = false
  }
}
