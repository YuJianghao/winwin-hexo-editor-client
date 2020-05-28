
// import { date } from 'quasar'
import { confirmDialog } from 'src/utils/dialog'
import message from 'src/utils/message'
import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'Dispatcher' })

// 用户相关

export async function login ({ dispatch }, { username, password }) {
  logger.log('login')
  await dispatch('globalUser/login', { username, password })
}

export async function logout ({ rootGetters, commit, dispatch }) {
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
}

// 组件生命周期相关

export async function init ({ commit, dispatch }) {
  logger.log('init')
  try {
    commit('editorUi/init')
    commit('editorUi/showLoading')
    commit('globalUser/init')
    await dispatch('editorCore/init')
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '初始化失败', caption: err.message })
    throw err
  } finally {
    commit('editorUi/hideLoading')
  }
}

export async function destroy ({ commit, dispatch }) {
  logger.log('destroy')
  commit('editorUi/destroy')
  await dispatch('editorCore/destroy')
}

export async function reload ({ commit, dispatch }, force = false) {
  try {
    commit('editorUi/showLoading')
    await dispatch('editorCore/reload', force)
    message.success({ message: '重载成功' })
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '重载失败', caption: err.message })
  } finally {
    commit('editorUi/hideLoading')
  }
}

// 查看相关

/**
 * @param {String} [payload._id] 需要查看的文章id
 * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
 */
export async function viewPostById ({ rootGetters, commit, dispatch }, payload = {}) {
  logger.log('viewPostById')
  const _id = payload.force || null
  const force = payload.force || false
  try {
    if (!force && !rootGetters['editorCore/isPostSaved']) {
      await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
        await dispatch('editorCore/loadPostById', { _id, force: true })
        commit('editorUi/viewPost')
        resolve()
      })
    } else {
      await dispatch('editorCore/loadPostById', { _id, force })
      commit('editorUi/viewPost')
    }
  } catch (err) {
    message.error({ message: '文章载入失败', caption: err.message })
  }
}

// 筛选

export async function filterByAll ({ commit }) {
  logger.log('filterByAll')
  commit('editorFilter/filterByAll')
}

export async function filterByCategoriesId ({ commit }, _id) {
  logger.log('filterByCategoriesId')
  commit('editorFilter/filterByCategoriesId', _id)
}

export async function filterByTagsId ({ commit }, _id) {
  logger.log('filterByTagsId')
  commit('editorFilter/filterByTagsId', _id)
}

export async function filterByUnCategorized ({ commit }) {
  logger.log('filterByUnCategorized')
  commit('editorFilter/filterByUnCategorized')
}

// 编辑

export async function addPostByDefault ({ rootGetters, commit, dispatch }) {
  logger.log('addPostByDefault')
  try {
    if (!rootGetters['editorCore/isPostSaved']) {
      await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
        await dispatch('editorCore/addPostBase', { force: true })
        commit('editorUi/editPost')
        resolve()
      })
    } else {
      await dispatch('editorCore/addPostBase')
      commit('editorUi/editPost')
    }
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '新建失败', caption: err.message })
  }
}

export async function deletePostById ({ rootState, dispatch }, payload = {}) {
  const { _id } = payload
  logger.log('deletePostById')
  const post = rootState.editorCore.data.posts[_id || rootState.editorCore.data.post._id]
  const message = `你确认要删除《${post.title}》么？`
  // if (post.date)message += `（最后编辑于${date.formatDate(post.date, 'YYYY年MM月DD日 HH:mm:ss')}）`
  return confirmDialog('删除确认', message, '删除', 'red', null, 'primary', 'cancel', async resolve => {
    try {
      await dispatch('editorCore/deletePostById', { _id })
      await dispatch('editorUi/deletePost', _id)
    } catch (err) {
      message.error({ message: '删除失败', caption: err.message })
    } finally {
      resolve()
    }
  })
}

export async function editPostById ({ getters, rootGetters, commit, dispatch }, payload = {}) {
  logger.log('editPostById')
  let { _id, force } = payload
  force = force || false
  if (!force && !rootGetters['editorCore/isPostSaved'] && !await getters['editorCore/dataPostId'] === _id) {
    await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
      await dispatch('editorCore/loadPostById', { _id, force: true })
      commit('editorUi/editPost')
      resolve()
    })
  } else {
    await dispatch('editorCore/loadPostById', { _id, force })
    commit('editorUi/editPost')
  }
}

export async function publishPostById ({ dispatch }, { _id }) {
  logger.log('publishPostById')
  try {
    await dispatch('editorCore/publishPostById', { _id })
  } catch (err) {
    message.error({ message: '发布失败', caption: err.message })
  }
}

export async function unpublishPostById ({ dispatch }, { _id }) {
  logger.log('unpublishPostById')
  await confirmDialog(null, '你确认要取消发布么？取消后无法撤销，再次发布的文章地址也会变更', '取消发布', 'red', null, 'primary', 'cancel', async resolve => {
    try {
      await dispatch('editorCore/unpublishPostById', { _id })
    } catch (err) {
      message.error({ message: '发布失败', caption: err.message })
    }
    resolve()
  })
}

export async function setPostByTitle ({ commit }, title) {
  logger.log('setPostByTitle')
  commit('editorCore/updatePostByTitle', title)
}
export async function setPostByContent ({ commit }, content) {
  logger.log('setPostByContent')
  commit('editorCore/updatePostByContent', content)
}
export async function setPostByTags ({ commit }, tags) {
  logger.log('setPostByTags')
  commit('editorCore/updatePostByTags', tags)
}
export async function setPostByCategoriesArray2d ({ commit }, cats) {
  logger.log('setPostByCategoriesArray2d')
  commit('editorCore/updatePostByCategoriesArray2D', cats)
}

// 操作相关

export async function deploy ({ commit, dispatch }) {
  logger.log('deploy')
  await confirmDialog(null, '确定部署博客么？', null, null, null, null, 'ok', async resolve => {
    try {
      commit('editorUi/showLoading', { message: '正在部署', delay: 100 })
      await dispatch('editorCore/deploy')
      message.success({ message: '部署完成' })
    } catch (err) {
      if (err.status === 503)err.message = '请配置`hexo deploy`命令'
      message.error({ message: '部署失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
      resolve()
    }
  })
}

export async function syncGit ({ commit, dispatch }) {
  logger.log('syncGit')
  await confirmDialog(null, '确定从git同步么？未保存到git的文件将丢失', '放弃文件并同步', 'red', '返回', 'primary', 'cancel', async resolve => {
    try {
      commit('editorUi/showLoading', { message: '正在从GIT同步', delay: 100 })
      await dispatch('editorCore/syncGit')
      message.success({ message: '同步完成' })
    } catch (err) {
      if (err.status === 503)err.message = '请配置Git命令'
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
      resolve()
    }
  })
}

export async function saveGit ({ commit, dispatch }) {
  logger.log('saveGit')
  try {
    commit('editorUi/showLoading', { message: '正在同步到GIT', delay: 100 })
    await dispatch('editorCore/saveGit')
    message.success({ message: '同步完成' })
  } catch (err) {
    if (err.status === 503)err.message = '请配置Git远端仓库'
    message.error({ message: '同步失败', caption: err.message })
  } finally {
    commit('editorUi/hideLoading')
  }
}

export async function savePost ({ commit, dispatch }) {
  logger.log('savePost')
  try {
    commit('editorUi/showLoading', { message: '正在保存', delay: 100 })
    await dispatch('editorCore/savePost')
    message.success({ message: '保存成功' })
  } catch (err) {
    if (err.status === 404) {
      err.message = '列表已更新，请刷新'
    }
    message.error({ message: '保存失败', caption: err.message })
  } finally {
    commit('editorUi/hideLoading')
  }
}

// ui相关

export async function toggleFull ({ commit }) {
  logger.log('toggleFull')
  commit('editorUi/toggleFull')
}

export async function togglePreview ({ commit }) {
  logger.log('togglePreview')
  commit('editorUi/togglePreview')
}

// 排序相关

export async function setSortKey ({ dispatch }, key) {
  logger.log('setSortKey')
  await dispatch('editorSorter/setKey', key)
}

export async function setSortDirection ({ dispatch }, direction) {
  logger.log('setSortDirection')
  await dispatch('editorSorter/setDirection', direction)
}

export async function toggleSortDirection ({ dispatch }) {
  logger.log('toggleSortDirection')
  await dispatch('editorSorter/toggleSortDirection')
}
