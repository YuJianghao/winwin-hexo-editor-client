import { LocalStorage } from "quasar"
import api from "src/api"
import Router from "src/router"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants"
import { failedInfo } from "./mutations"

export async function login({ commit }, { name, pass }) {
  commit('requestLogin')
  try {
    await api.auth.login(name, pass)
    commit('successLogin')
    Router.push('/')
  } catch (err) {
    commit('failedLogin', err)
  }
}

export async function logout({ commit }, local) {
  try {
    if (!local) await api.auth.logout()
    LocalStorage.remove(ACCESS_TOKEN_KEY)
    LocalStorage.remove(REFRESH_TOKEN_KEY)
    commit('logout')
    Router.push('/login')
  } catch (e) { }
}

export async function info({ commit, dispatch }) {
  commit('requestInfo')
  try {
    const info = (await api.auth.info()).data
    commit('successInfo', info)
  } catch (err) {
    if (err.response.status !== 401) commit('failedInfo', err)
  }
}
