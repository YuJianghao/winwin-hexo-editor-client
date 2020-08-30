import { loadLoginToken, saveLoginToken } from 'src/utils/storage'
import users from 'src/api/users'

export default {
  namespaced: true,
  state: {
    inited: false,
    isLoggedIn: undefined
  },
  mutations: {
    init (state) {
      state.isLoggedIn = !!loadLoginToken()
      state.inited = true
    },
    login (state) {
      state.isLoggedIn = true
    },
    logout (state) {
      saveLoginToken('')
      state.isLoggedIn = false
    }
  },
  actions: {
    async  login ({ commit }, { username, password }) {
      await users.getLoginToken(username, password)
      commit('login')
    }
  }
}
