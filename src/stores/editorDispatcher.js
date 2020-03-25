
import hexo from '@winwin/hexo-editor-sdk'
import { hexoEditorCore } from '../stores/editorStore'
import request from '../api/request'
import { editorUiStore } from './editorUiStore'
import message from 'src/utils/message'
import { Loading } from 'quasar'

export async function init () {
  await hexoEditorCore.init({
    api: hexo({
      baseUrl: process.env.HEXO_SERVER_BASE,
      axios: request
    }),
    debug: process.env.DEV
  })
  await editorUiStore.init()
}

export async function editPostById (_id, force = false) {
  if (!force && !hexoEditorCore.state.saved && !await hexoEditorCore.isCurrentPost(_id)) {
    await editorUiStore.confirm(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
      await hexoEditorCore.loadPostById(_id, true)
      await editorUiStore.editPost()
    })
  } else {
    await hexoEditorCore.loadPostById(_id, force)
    await editorUiStore.editPost()
  }
}

export async function viewPostById (_id, force = false) {
  if (!force && !hexoEditorCore.state.saved) {
    await editorUiStore.confirm(null, '要离开么，未保存的文件会丢失', '离开', 'red', '返回', 'primary', 'cancel', async resolve => {
      await hexoEditorCore.loadPostById(_id, true)
      await editorUiStore.viewPost()
    })
  } else {
    await hexoEditorCore.loadPostById(_id, force)
    await editorUiStore.viewPost()
  }
}

export async function deletePostById (_id) {
  return editorUiStore.confirm(null, '你确认要删除么', '删除', 'red', null, 'primary', 'cancel', async resolve => {
    try {
      await editorUiStore.deletePost()
      await hexoEditorCore.deletePostById(_id)
    } catch (err) {
      if (hexoEditorCore.state.post) { await editorUiStore.viewPost() }
    } finally {
      resolve()
    }
  })
}

export async function addPostByDefault () {
  await hexoEditorCore.addPostByDefault()
  await editorUiStore.editPost()
}

export async function publishPostById (_id) {
  await hexoEditorCore.publishPostById(_id)
}

export async function unpublishPostById (_id) {
  await hexoEditorCore.unpublishPostById(_id)
}

export async function setPostByCategoriesArray2d (cats) {
  await hexoEditorCore.setPostByCategoriesArray2d(cats)
}
export async function setPostByTitle (title) {
  await hexoEditorCore.setPostByTitle(title)
}
export async function setPostByContent (content) {
  await hexoEditorCore.setPostByContent(content)
}
export async function setPostByTags (tags) {
  await hexoEditorCore.setPostByTags(tags)
}

export async function filterByCategoriesId (_id) {
  await hexoEditorCore.filterByCategoriesId(_id)
}

export async function filterByTagsId (_id) {
  await hexoEditorCore.filterByTagsId(_id)
}

export async function filterByAll () {
  await hexoEditorCore.filterByAll()
}

export async function filterByUnCategorized () {
  await hexoEditorCore.filterByUnCategorized()
}

export async function deploy () {
  await editorUiStore.confirm(null, '确定部署博客么？', null, null, null, null, 'ok', async resolve => {
    try {
      Loading.show({ message: '正在部署' })
      await hexoEditorCore.deploy()
      message.success({ message: '部署完成' })
    } catch (err) {
      message.error({ message: '部署失败', caption: err.message })
    } finally {
      Loading.hide()
      resolve()
    }
  })
}

export async function syncGit () {
  await editorUiStore.confirm(null, '确定从git同步么？未保存到git的文件将丢失', '放弃文件并同步', 'red', '返回', 'primary', 'cancel', async resolve => {
    try {
      Loading.show({ message: '正在从GIT同步' })
      await hexoEditorCore.syncGit()
      message.success({ message: '同步完成' })
    } catch (err) {
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      Loading.hide()
      resolve()
    }
  })
}

export async function saveGit () {
  try {
    Loading.show({ message: '正在同步到GIT' })
    await hexoEditorCore.saveGit()
    message.error({ message: '同步完成' })
  } catch (err) {
    message.error({ message: '同步失败', caption: err.message })
  } finally {
    Loading.hide()
  }
}

export async function reload (force = false) {
  try {
    Loading.show({ delay: 500 })
    await hexoEditorCore.reload(force)
  } catch (err) {
    if (err.status === 404) {
      await editorUiStore.closePost()
      await hexoEditorCore.closePost()
    }
    message.error({ message: '重载失败', caption: err.message })
  } finally {
    Loading.hide()
  }
}

export async function savePost () {
  try {
    await hexoEditorCore.savePost()
    message.success({ message: '保存成功' })
  } catch (err) {
    if (err.status === 404) {
      err.message = '列表已更新，请刷新'
    }
    message.error({ message: '保存失败', caption: err.message })
  }
}

export async function toggleFull () {
  await editorUiStore.toggleFull()
}

export async function togglePreview () {
  await editorUiStore.togglePreview()
}

export async function destroy () {
  await hexoEditorCore.destory()
  await editorUiStore.destory()
}
