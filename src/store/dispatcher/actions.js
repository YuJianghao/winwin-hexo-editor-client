
// import { date } from 'quasar'
import { confirmDialog, newPostDialog } from 'src/utils/dialog'
import message from 'src/utils/message'
import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'Dispatcher' })

import * as actionTypes from './action-types'
import * as editorCoreActionTypes from '../editorCore/action-types'
import * as filterMutationTypes from '../editorFilter/mutation-types'

// 用户相关

const actions = {
  [actionTypes.login]: async ({ dispatch }, { username, password }) => {
    logger.log('login')
    await dispatch('globalUser/login', { username, password })
  },

  [actionTypes.logout]: async ({ rootGetters, commit, dispatch }) => {
    logger.log('logout')
    if (!rootGetters['editorCore/isPostSaved']) {
      await confirmDialog(null, '要退出么，未保存的文件会丢失', '退出', 'red', '返回', 'primary', 'cancel', async resolve => {
        await dispatch('destroy')
        commit('globalUser/logout')
        resolve()
      })
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
      message.error({ message: '初始化失败', caption: err.message })
      throw err
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
        await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
          await dispatch('viewPostById', { _id, force: true })
          resolve()
        })
      } else {
        await dispatch('editorCore/' + editorCoreActionTypes.loadArticleById, { _id, force })
        commit('editorUi/viewPost')
      }
    } catch (err) {
      message.error({ message: '文章载入失败', caption: err.message })
    }
  },

  // 筛选

  [actionTypes.filterByAll]: async ({ commit }) => {
    logger.log('filterByAll')
    commit('editorFilter/' + filterMutationTypes.filterByAll)
  },

  [actionTypes.filterByCategoriesId]: async ({ commit }, _id) => {
    logger.log('filterByCategoriesId')
    commit('editorFilter/' + filterMutationTypes.filterByCategoriesId, _id)
  },

  [actionTypes.filterByTagsId]: async ({ commit }, _id) => {
    logger.log('filterByTagsId')
    commit('editorFilter/' + filterMutationTypes.filterByTagsId, _id)
  },

  [actionTypes.filterByUnCategorized]: async ({ commit }) => {
    logger.log('filterByUnCategorized')
    commit('editorFilter/' + filterMutationTypes.filterByUnCategorized)
  },

  // 编辑

  [actionTypes.addPostByDefault]: async ({ rootGetters, commit, dispatch }) => {
    logger.log('addPostByDefault')
    try {
      if (!rootGetters['editorCore/isPostSaved']) {
        await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
          newPostDialog(async (options) => {
            await dispatch('editorCore/' + editorCoreActionTypes.addArticleBase, { force: true, options })
            commit('editorUi/editPost')
            resolve()
          })
        })
      } else {
        await newPostDialog(async (options) => {
          await dispatch('editorCore/' + editorCoreActionTypes.addArticleBase, { options })
          commit('editorUi/editPost')
        })
      }
    } catch (err) {
      if (err.status === 401) return
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
    return confirmDialog('删除确认', message, '删除', 'red', null, 'primary', 'cancel', async resolve => {
      try {
        await dispatch('editorCore/' + editorCoreActionTypes.deleteArticleById, { _id })
        await dispatch('editorUi/deletePost', _id)
      } catch (err) {
        message.error({ message: '删除失败', caption: err.message })
      } finally {
        resolve()
      }
    })
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
        await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
          await dispatch(actionTypes.editPostByIdDispatcher, { _id, force: true })
          resolve()
        })
      } else {
        await dispatch(actionTypes.editPostByIdDispatcher, { _id, force })
      }
    } catch (err) {
      message.error({ message: '文章载入失败', caption: err.message })
    }
  },

  [actionTypes.editPostByIdDispatcher]: async ({ commit, dispatch }, payload = {}) => {
    logger.log('editPostByIdDispatcher', payload)
    const _id = payload._id || null
    const force = payload.force || false
    await dispatch('editorCore/' + editorCoreActionTypes.loadArticleById, { _id, force })
    commit('editorUi/editPost', { _id, force })
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
        await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
          await dispatch(actionTypes.publishPostById, { _id, force: true })
          resolve()
        })
      } else {
        await dispatch('editorCore/' + editorCoreActionTypes.publishPostById, { _id, force })
      }
    } catch (err) {
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
        await confirmDialog(null, '你确认要取消发布么？未保存的文件会丢失', '继续取消发布', 'red', '返回', 'primary', 'cancel', async resolve => {
          await dispatch(actionTypes.unpublishPostById, { _id, force: true })
          resolve()
        })
      } else {
        await confirmDialog(null, '你确认要取消发布么？取消后无法撤销，再次发布的文章地址也会变更', '取消发布', 'red', null, 'primary', 'cancel', async resolve => {
          await dispatch('editorCore/' + editorCoreActionTypes.unpublishPostById, { _id, force })
          resolve()
        })
      }
    } catch (err) {
      message.error({ message: '发布失败', caption: err.message })
    }
  },

  [actionTypes.setPostByPost]: async ({ dispatch }, article) => {
    logger.log('setPostByPost')
    await dispatch('editorCore/' + editorCoreActionTypes.updateArticle, article)
  },

  // 操作相关

  [actionTypes.deploy]: async ({ commit, dispatch }) => {
    logger.log('deploy')
    await confirmDialog(null, '确定部署博客么？', null, null, null, null, 'ok', async resolve => {
      try {
        commit('editorUi/showLoading', { message: '正在部署', delay: 100 })
        await dispatch('editorCore/' + editorCoreActionTypes.deploy)
        message.success({ message: '部署完成' })
      } catch (err) {
        if (err.status === 503)err.message = '请配置`hexo deploy`命令'
        message.error({ message: '部署失败', caption: err.message })
      } finally {
        commit('editorUi/hideLoading')
        resolve()
      }
    })
  },

  [actionTypes.generate]: async ({ commit, dispatch }) => {
    logger.log('generate')
    try {
      commit('editorUi/showLoading', { message: '正在生成', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.generate)
      message.success({ message: '生成完成' })
    } catch (err) {
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
      message.error({ message: '清理失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  [actionTypes.syncGit]: async ({ commit, dispatch }) => {
    logger.log('syncGit')
    await confirmDialog(null, '确定从git同步么？未保存到git的文件将丢失', '放弃文件并同步', 'red', '返回', 'primary', 'cancel', async resolve => {
      try {
        commit('editorUi/showLoading', { message: '正在从GIT同步', delay: 100 })
        await dispatch('editorCore/' + editorCoreActionTypes.syncGit)
        message.success({ message: '同步完成' })
      } catch (err) {
        if (err.status === 503)err.message = '请配置Git命令'
        message.error({ message: '同步失败', caption: err.message })
      } finally {
        commit('editorUi/hideLoading')
        resolve()
      }
    })
  },

  [actionTypes.saveGit]: async ({ commit, dispatch }) => {
    logger.log('saveGit')
    try {
      commit('editorUi/showLoading', { message: '正在同步到GIT', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.saveGit)
      message.success({ message: '同步完成' })
    } catch (err) {
      if (err.status === 503)err.message = '请配置Git远端仓库'
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
    }
  },

  [actionTypes.savePost]: async ({ commit, dispatch }) => {
    logger.log('savePost')
    try {
      commit('editorUi/showLoading', { message: '正在保存', delay: 100 })
      await dispatch('editorCore/' + editorCoreActionTypes.saveArticle)
      message.success({ message: '保存成功' })
    } catch (err) {
      if (err.status === 404) {
        err.message = '列表已更新，请刷新'
      }
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

  [actionTypes.togglePreview]: async ({ commit }) => {
    logger.log('togglePreview')
    commit('editorUi/togglePreview')
  },

  // 排序相关

  [actionTypes.setSortKey]: async ({ dispatch }, key) => {
    logger.log('setSortKey')
    await dispatch('editorSorter/setKey', key)
  },

  [actionTypes.setSortDirection]: async ({ dispatch }, direction) => {
    logger.log('setSortDirection')
    await dispatch('editorSorter/setDirection', direction)
  },

  [actionTypes.toggleSortDirection]: async ({ dispatch }) => {
    logger.log('toggleSortDirection')
    await dispatch('editorSorter/toggleSortDirection')
  },

  // 搜索

  [actionTypes.search]: async ({ dispatch }, payload) => {
    logger.log('search', payload)
    const q = payload.q || ''
    const size = payload.size || ''
    await dispatch('editorSearch/search', { q, size })
  }
}

export default actions
