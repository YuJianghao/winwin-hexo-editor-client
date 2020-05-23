
import hexo from '@winwin/hexo-editor-sdk'
import { hexoEditorCore } from 'src/stores/editorStore'
import request from 'src/api/request'
import { confirmDialog } from 'src/utils/dialog'
import message from 'src/utils/message'

// 用户相关

export async function login ({ commit, dispatch }, { username, password }) {
  await dispatch('globalUser/login', { username, password })
}

export async function logout ({ commit, dispatch }) {
  // TODO: Replace hexoEditorCore
  if (!hexoEditorCore.state.saved) {
    await confirmDialog(null, '要退出么，未保存的文件会丢失', '退出', 'red', '返回', 'primary', 'cancel', async resolve => {
      commit('globalUser/logout')
    })
  } else {
    dispatch('destroy')
    commit('globalUser/logout')
  }
}

// 组件生命周期相关

export async function init ({ commit, dispatch }) {
  try {
    commit('editorUi/showLoading')
    commit('globalUser/init')
    // TODO: Remove hexoEditorCore
    await dispatch('editorCore/init')
    await hexoEditorCore.init({
      api: hexo({
        baseUrl: process.env.HEXO_SERVER_BASE,
        axios: request
      }),
      debug: process.env.DEV
    })
    commit('editorUi/init')
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '初始化失败', caption: err.message })
    throw err
  } finally {
    commit('editorUi/hideLoading')
  }
}

export async function destroy ({ commit, dispatch }) {
  commit('editorUi/destroy')
  // TODO： Rmove hexoEditorCore
  await dispatch('editorCore/destroy')
  await hexoEditorCore.destory()
}

export async function reload ({ commit, dispatch }, force = false) {
  try {
    commit('editorUi/showLoading')
    // TODO： Rmove hexoEditorCore
    await dispatch('editorCore/reload')
    await hexoEditorCore.reload(force)
    message.success({ message: '重载成功' })
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '重载失败', caption: err.message })
  } finally {
    commit('editorUi/hideLoading')
  }
}

// 查看相关

export async function viewPostById ({ commit, dispatch }, payload = { force: false }) {
  const { _id, force } = payload
  try {
    // TODO: Replace hexoEditorCore
    if (!force && !hexoEditorCore.state.saved) {
      await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
      // TODO： Rmove hexoEditorCore
        await dispatch('editorCore/loadPostById', { _id, force: true })
        await hexoEditorCore.loadPostById(_id, true)
        commit('editorUi/viewPost')
      })
    } else {
      // TODO： Rmove hexoEditorCore
      await dispatch('editorCore/loadPostById', { _id, force })
      await hexoEditorCore.loadPostById(_id, force)
      commit('editorUi/viewPost')
    }
  } catch (err) {
    message.error({ message: '文章载入失败', caption: err.message })
  }
}

// 筛选

export async function filterByAll ({ commit }) {
  commit('editorFilter/filterByAll')
  await hexoEditorCore.filterByAll()
}

export async function filterByCategoriesId ({ commit }, _id) {
  commit('editorFilter/filterByCategoriesId', _id)
  await hexoEditorCore.filterByCategoriesId(_id)
}

export async function filterByTagsId ({ commit }, _id) {
  commit('editorFilter/filterByTagsId', _id)
  await hexoEditorCore.filterByTagsId(_id)
}

export async function filterByUnCategorized ({ commit }) {
  commit('editorFilter/filterByUnCategorized')
  await hexoEditorCore.filterByUnCategorized()
}

// 编辑

export async function addPostByDefault ({ commit, dispatch }) {
  try {
    if (!hexoEditorCore.state.saved) {
      await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
        // TODO： Rmove hexoEditorCore
        await dispatch('editorCore/addPostBase', { force: true })
        commit('editorUi/editPost')
      })
    } else {
      // TODO： Rmove hexoEditorCore
      await dispatch('editorCore/addPostBase')
      // TODO: 完成后恢复编辑器行为
      // commit('editorUi/editPost')
    }
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '新建失败', caption: err.message })
  }
}

export async function deletePostById ({ commit, dispatch }, _id) {
  return confirmDialog(null, '你确认要删除么', '删除', 'red', null, 'primary', 'cancel', async resolve => {
    try {
      // TODO： Rmove hexoEditorCore
      await dispatch('editorCore/deletePostById', _id)
      // TODO: 完成后恢复编辑器行为
      // commit('editorUi/deletePost')
    } catch (err) {
      // TODO: 异常处理
      message.error({ message: '删除失败', caption: err.message })
    } finally {
      resolve()
    }
  })
}

export async function editPostById ({ commit, dispatch }, payload = {}) {
  let { _id, force } = payload
  force = force || false
  if (!force && !hexoEditorCore.state.saved && !await hexoEditorCore.isCurrentPost(_id)) {
    await confirmDialog(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
      // TODO： Rmove hexoEditorCore
      await dispatch('editorCore/loadPostById', { _id, force: true })
      await hexoEditorCore.loadPostById(_id, true)
      commit('editorUi/editPost')
    })
  } else {
    await dispatch('editorCore/loadPostById', { _id, force })
    await hexoEditorCore.loadPostById(_id, force)
    commit('editorUi/editPost')
  }
}

export async function publishPostById ({ commit }, _id) {
  await hexoEditorCore.publishPostById(_id)
}

export async function unpublishPostById ({ commit }, _id) {
  return confirmDialog(null, '你确认要取消发布么？取消后无法撤销，再次发布的文章地址也会变更', '取消发布', 'red', null, 'primary', 'cancel', async resolve => {
    await hexoEditorCore.unpublishPostById(_id)
    resolve()
  })
}

export async function setPostByTitle ({ commit }, title) {
  commit('editorCore/updateDataPostByTitle', title)
  await hexoEditorCore.setPostByTitle(title)
}
export async function setPostByContent ({ commit }, content) {
  commit('editorCore/updateDataPostByContent', content)
  await hexoEditorCore.setPostByContent(content)
}
export async function setPostByTags ({ commit }, tags) {
  commit('editorCore/updateDataPostByTags', tags)
  await hexoEditorCore.setPostByTags(tags)
}
export async function setPostByCategoriesArray2d ({ commit }, cats) {
  commit('editorCore/updateDataPostByCategoriesArray2D', cats)
  await hexoEditorCore.setPostByCategoriesArray2d(cats)
}

// 操作相关

export async function deploy ({ commit }) {
  await confirmDialog(null, '确定部署博客么？', null, null, null, null, 'ok', async resolve => {
    try {
      commit('editorUi/showLoading', { message: '正在部署', delay: 100 })
      await hexoEditorCore.deploy()
      message.success({ message: '部署完成' })
    } catch (err) {
      message.error({ message: '部署失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
      resolve()
    }
  })
}

export async function syncGit ({ commit }) {
  await confirmDialog(null, '确定从git同步么？未保存到git的文件将丢失', '放弃文件并同步', 'red', '返回', 'primary', 'cancel', async resolve => {
    try {
      commit('editorUi/showLoading', { message: '正在从GIT同步', delay: 100 })
      await hexoEditorCore.syncGit()
      message.success({ message: '同步完成' })
    } catch (err) {
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      commit('editorUi/hideLoading')
      resolve()
    }
  })
}

export async function saveGit ({ commit }) {
  try {
    commit('editorUi/showLoading', { message: '正在同步到GIT', delay: 100 })
    await hexoEditorCore.saveGit()
    message.success({ message: '同步完成' })
  } catch (err) {
    message.error({ message: '同步失败', caption: err.message })
  } finally {
    commit('editorUi/hideLoading')
  }
}

export async function savePost ({ commit }) {
  try {
    const timer = window.setTimeout(() => {
      message.info({ message: '正在保存' })
    }, 500)
    await hexoEditorCore.savePost()
    window.clearTimeout(timer)
    message.success({ message: '保存成功' })
  } catch (err) {
    if (err.status === 404) {
      err.message = '列表已更新，请刷新'
    }
    message.error({ message: '保存失败', caption: err.message })
  }
}

// ui相关

export async function toggleFull ({ commit }) {
  commit('editorUi/toggleFull')
}

export async function togglePreview ({ commit }) {
  commit('editorUi/togglePreview')
}
