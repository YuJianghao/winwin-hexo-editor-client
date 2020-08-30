
// import { date } from 'quasar'
import message from 'src/utils/message'
import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'Dispatcher' })

import * as actionTypes from './action-types'
import * as editorCoreActionTypes from '../editorCore/action-types'
import { debounce } from 'quasar'
import { redirect, replaceQuery } from 'src/utils/url'
import dialogService from 'src/service/DialogService'
import * as dialogTypes from 'src/service/DialogService/dialog-types'

// 用户相关

const actions = {
  [actionTypes.login]: async ({ dispatch }, { username, password }) => {
    logger.log('login')
    await dispatch('globalUser/login', { username, password })
  },

  [actionTypes.logout]: async ({ rootGetters, commit, dispatch }) => {
    logger.log('logout')
    if (!rootGetters['editorCore/isPostSaved']) {
      const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
        message: '要退出么，未保存的文件会丢失',
        okLabel: '退出',
        okColor: 'red',
        cancelLabel: '返回',
        cancelColor: 'primary',
        focus: 'cancel'
      })
      if (type !== 'ok') return
      await dispatch('destroy')
      commit('globalUser/logout')
    } else {
      await dispatch('destroy')
      commit('globalUser/logout')
    }
  },

  // 组件生命周期相关

  [actionTypes.init]: async ({ commit, dispatch }) => {
    logger.log('init')
    try {
      commit('editorUi/init')
      commit('editorUi/showLoading')
      commit('globalUser/init')
      await dispatch('editorCore/' + editorCoreActionTypes.init)
      await dispatch('editorSearch/init')
    } catch (err) {
      if (err.status === 401) return
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '初始化失败' })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  [actionTypes.destroy]: async ({ commit, dispatch }) => {
    logger.log('destroy')
    commit('editorUi/destroy')
    await dispatch('editorCore/' + editorCoreActionTypes.destroy)
  },

  [actionTypes.reload]: async ({ commit, dispatch }, force = false) => {
    try {
      commit('editorUi/showLoading')
      await dispatch('editorCore/' + editorCoreActionTypes.reload, force)
      message.success({ message: '重载成功' })
    } catch (err) {
      if (err.status === 401) return
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '重载失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  // 查看相关

  /**
   * @param {String} [payload._id] 需要查看的文章id，默认未当前已打开文章
   * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
   */
  [actionTypes.viewPostById]: async ({ rootGetters, commit, dispatch }, payload = {}) => {
    logger.log('viewPostById', payload)
    const _id = payload._id || null
    const force = payload.force || false

    // 如果不是强制且没有保存，且不是当前已经打开的文章，则请求保存
    const requestSave = (!force && !rootGetters['editorCore/isPostSaved']) &&
      (_id && (_id !== rootGetters['editorCore/dataPostId']))
    try {
      if (requestSave) {
        const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
          message: '要退出么，未保存的文件会丢失',
          okLabel: '退出',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        await dispatch('viewPostById', { _id, force: true })
      } else {
        const href = replaceQuery(window.location.href, { mode: 'view', id: _id })
        if (href !== window.location.href) redirect(href)
        else {
          logger.log('doViewPostById', payload)
          await dispatch('editorCore/' + editorCoreActionTypes.loadArticleById, { _id, force })
        }
      }
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '文章载入失败', caption: err.message })
    }
  },

  // 编辑

  [actionTypes.addPostByDefault]: async ({ rootGetters, commit, dispatch }) => {
    logger.log('addPostByDefault')
    try {
      if (!rootGetters['editorCore/isPostSaved']) {
        const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
          message: '要离开么，未保存的文件会丢失',
          okLabel: '离开',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
      }
      const { type, data } = await dialogService.create(dialogTypes.NewPostDialog)
      if (type === 'ok') {
        await dispatch('editorCore/' + editorCoreActionTypes.addArticleBase, { data })
      }
    } catch (err) {
      if (process.env.DEV)logger.warn(err)
      if (err.status === 401) return
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '新建失败', caption: err.message })
    }
  },

  /**
   * @param {String} [payload._id] 需要删除的文章id，默认未当前已打开文章
   * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
   */
  [actionTypes.deletePostById]: async ({ rootState, dispatch }, payload = {}) => {
    logger.log('deletePostById', payload)
    const { _id } = payload
    const post = rootState.editorCore.data.articles[_id || rootState.editorCore.data.article._id]
    const message = `你确认要删除《${post.title}》么？`
    // if (post.date)message += `（最后编辑于${date.formatDate(post.date, 'YYYY年MM月DD日 HH:mm:ss')}）`

    const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
      title: '删除确认',
      message,
      okLabel: '删除',
      okColor: 'red',
      cancelColor: 'primary',
      focus: 'cancel'
    })
    if (type !== 'ok') return
    try {
      await dispatch('editorCore/' + editorCoreActionTypes.deleteArticleById, { _id })
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '删除失败', caption: err.message })
    }
  },

  /**
   * @param {String} [payload._id] 需要编辑的文章id，默认未当前已打开文章
   * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
   */
  [actionTypes.editPostById]: async ({ rootGetters, commit, dispatch }, payload = {}) => {
    logger.log('editPostById', payload)
    const _id = payload._id || null
    const force = payload.force || false

    // 如果不是强制且没有保存，且不是当前已经打开的文章，则请求保存
    const requestSave = (!force && !rootGetters['editorCore/isPostSaved']) &&
      (_id && (_id !== rootGetters['editorCore/dataPostId']))
    try {
      if (requestSave) {
        const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
          message: '要退出么，未保存的文件会丢失',
          okLabel: '退出',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        await dispatch(actionTypes.editPostById, { _id, force: true })
      } else {
        const href = replaceQuery(window.location.href, { mode: 'edit', id: _id })
        if (href !== window.location.href) redirect(href)
        else {
          logger.log('doEditPostById', payload)
          await dispatch('editorCore/' + editorCoreActionTypes.loadArticleById, { _id, force })
        }
      }
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '文章载入失败', caption: err.message })
    }
  },

  /**
   * @param {String} [payload._id] 需要发布的文章id，默认未当前已打开文章
   * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
   */
  [actionTypes.publishPostById]: async ({ getters, rootGetters, dispatch }, payload = {}) => {
    logger.log('publishPostById', payload)
    const _id = payload._id || null
    const force = payload.force || false
    try {
      if (!force && !rootGetters['editorCore/isPostSaved']) {
        const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
          message: '要退出么，未保存的文件会丢失',
          okLabel: '退出',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        await dispatch(actionTypes.publishPostById, { _id, force: true })
      } else {
        await dispatch('editorCore/' + editorCoreActionTypes.publishPostById, { _id, force })
      }
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '发布失败', caption: err.message })
    }
  },

  /**
   * @param {String} [payload._id] 需要取消发布的文章id，默认未当前已打开文章
   * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
   */
  [actionTypes.unpublishPostById]: async ({ rootGetters, dispatch }, payload = {}) => {
    logger.log('unpublishPostById', payload)
    const _id = payload._id || null
    const force = payload.force || false
    try {
      if (!force && !rootGetters['editorCore/isPostSaved']) {
        const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
          message: '你确认要取消发布么？未保存的文件会丢失',
          okLabel: '继续取消发布',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        await dispatch(actionTypes.unpublishPostById, { _id, force: true })
      } else {
        const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
          message: '你确认要取消发布么？取消后无法撤销，再次发布的文章地址也会变更',
          okLabel: '取消发布',
          okColor: 'red',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        await dispatch('editorCore/' + editorCoreActionTypes.unpublishPostById, { _id, force })
      }
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '发布失败', caption: err.message })
    }
  },

  [actionTypes.setPostByPost]: async ({ dispatch }, article) => {
    logger.log('setPostByPost')
    await dispatch('editorCore/' + editorCoreActionTypes.updateArticle, article)
    await dispatch(actionTypes.autoSavePost, true)
  },

  // 操作相关

  [actionTypes.deploy]: async ({ commit, dispatch }) => {
    logger.log('deploy')
    const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
      message: '确定部署博客么？',
      focus: 'ok'
    })
    if (type !== 'ok') return
    try {
      commit('editorUi/showLoading', { message: '正在部署', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.deploy)
      message.success({ message: '部署完成' })
    } catch (err) {
      if (err.status === 503) err.message = '请配置`hexo deploy`命令'
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '部署失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  [actionTypes.generate]: async ({ commit, dispatch }) => {
    logger.log('generate')
    try {
      commit('editorUi/showLoading', { message: '正在生成', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.generate)
      message.success({ message: '生成完成' })
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '生成失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  [actionTypes.clean]: async ({ commit, dispatch }) => {
    logger.log('clean')
    try {
      commit('editorUi/showLoading', { message: '正在清理', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.clean)
      message.success({ message: '清理完成' })
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '清理失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  [actionTypes.syncGit]: async ({ commit, dispatch }) => {
    logger.log('syncGit')
    const { type } = await dialogService.create(dialogTypes.ConfirmDialog, {
      message: '确定从git同步么？未保存到git的文件将丢失',
      okLabel: '放弃文件并同步',
      okColor: 'red',
      cancelLabel: '返回',
      cancelColor: 'primary',
      focus: 'cancel'
    })
    if (type !== 'ok') return
    try {
      commit('editorUi/showLoading', { message: '正在从GIT同步', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.syncGit)
      message.success({ message: '同步完成' })
    } catch (err) {
      if (err.status === 503) err.message = '请配置Git命令'
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  [actionTypes.saveGit]: async ({ commit, dispatch }) => {
    logger.log('saveGit')
    try {
      commit('editorUi/showLoading', { message: '正在同步到GIT', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.saveGit)
      message.success({ message: '同步完成' })
    } catch (err) {
      if (err.status === 503) err.message = '请配置Git远端仓库'
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  [actionTypes.savePost]: async ({ commit, dispatch }, isAuto) => {
    if (isAuto) {
      logger.log('autoSavePost')
    } else {
      logger.log('savePost')
    }
    try {
      if (!isAuto) commit('editorUi/showLoading', { message: '正在保存', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.saveArticle)
      if (!isAuto) message.success({ message: '保存成功' })
    } catch (err) {
      if (err.status === 404) {
        err.message = '列表已更新，请刷新'
      }
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '保存失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  // ui相关

  [actionTypes.toggleFull]: async ({ commit }) => {
    logger.log('toggleFull')
    commit('editorUi/toggleFull')
  },

  // 搜索

  [actionTypes.search]: async ({ dispatch }, payload) => {
    logger.log('search', payload)
    const q = payload.q || ''
    const size = payload.size || ''
    await dispatch('editorSearch/search', { q, size })
  }
}
actions[actionTypes.autoSavePost] = debounce(actions[actionTypes.savePost], 3000)

export default actions
