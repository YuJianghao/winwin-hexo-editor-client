import { loadLoginToken, saveLoginToken } from 'src/utils/storage'
import apis from 'src/api'

const mutations = {
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
  },
  setUserInfo (state, { username, id }) {
    state.username = username
    state.id = id
  }
}
export default {
  namespaced: true,
  state: {
    inited: false,
    isLoggedIn: undefined,
    username: null,
    id: null
  },
  mutations,
  actions: {
    async info ({ commit }) {
      const data = await apis.settings.user.getUserInfo()
      commit('setUserInfo', { username: data.username, id: data._id })
    },
    async  login ({ commit }, { username, password }) {
      const data = await apis.users.getLoginToken(username, password)
      commit('login')
      commit('setUserInfo', { username: data.name, id: data.id })
    }
  }
}
