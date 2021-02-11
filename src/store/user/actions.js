import api from "src/api"
import { failedInfo } from "./mutations"

export async function login({ commit }, { name, pass }) {
  commit('requestLogin')
  try {
    api.auth.login(name, pass)
    commit('successLogin')
  } catch (err) {
    commit('failedLogin', err)
  }
}

export async function logout({ commit }, local) {
  try {
    if (!local) api.auth.logout()
    commit('logout')
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
