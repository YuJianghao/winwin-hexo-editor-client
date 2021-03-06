
// import { date } from 'quasar'
import * as actionTypes from './action-types'
import { DialogService, DialogType } from 'src/service/dialog_service'
import DispatcherService from 'src/service/dispatcher_service'

// 用户相关

const actions = {
  [actionTypes.login]: async ({ dispatch }, { username, password }) => {
    await dispatch('user/login', { username, password })
  },

  [actionTypes.logout]: async ({ rootGetters, commit, dispatch }) => {
    if (!rootGetters['hexoCore/isPostSaved']) {
      const { type } = await DialogService.create(DialogType.ConfirmDialog, {
        message: '要退出么，未保存的文件会丢失',
        okLabel: '退出',
        okColor: 'red',
        cancelLabel: '返回',
        cancelColor: 'primary',
        focus: 'cancel'
      })
      if (type !== 'ok') return
    }
    await DispatcherService.destory()
    commit('user/logout')
  }
}

export default actions
