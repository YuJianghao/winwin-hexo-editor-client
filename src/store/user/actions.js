import { LocalStorage } from "quasar"
import Vue from "vue";
import api from "src/api"
import Router from "src/router"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants"
import { Logger } from "src/utils/logger"
const logger = new Logger({ prefix: 'user actions' })

export async function login({ commit }, { name, pass }) {
  commit('requestLogin')
  try {
    // TODO: 有机会了添加auth service，封装http错误
    await api.auth.login(name, pass)
    commit('successLogin')
    Vue.notify({
      title: '登录成功',
      type: 'success',
      duration: 1000
    })
    Router.push('/')
  } catch (err) {
    let message = ''
    if (err.response && err.response.data && err.response.data.message)
      message = err.response.data.message
    else {
      message = err.message
      logger.error(err)
    }
    Vue.notify({
      title: '登录失败',
      text: message,
      type: 'error',
      duration: 5000
    })
    commit('failedLogin', message)
  }
}

export async function logout({ commit }, local) {
  try {
    if (!local) await api.auth.logout()
    LocalStorage.remove(ACCESS_TOKEN_KEY)
    LocalStorage.remove(REFRESH_TOKEN_KEY)
    commit('logout')
    if (!local) Vue.notify({
      title: '登出成功',
      type: 'success',
      duration: 1000
    })
    Router.push('/login')
  } catch (e) {
    Vue.notify({
      title: '已登出，但出现了一些错误',
      text: e,
      type: 'warn',
      duration: 5000
    })
  }
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
