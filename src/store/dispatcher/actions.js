
import hexo from '@winwin/hexo-editor-sdk'
import { hexoEditorCore } from 'src/stores/editorStore'
import request from 'src/api/request'
import { editorUiStore } from 'src/stores/editorUiStore'
import message from 'src/utils/message'
import { loginStore } from 'src/stores/loginStore'

export async function init (ctx) {
  try {
    editorUiStore.showLoading({ delay: 500 })
    await loginStore.init()
    await hexoEditorCore.init({
      api: hexo({
        baseUrl: process.env.HEXO_SERVER_BASE,
        axios: request
      }),
      debug: process.env.DEV
    })
    await editorUiStore.init()
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '初始化失败', caption: err.message })
    throw err
  } finally {
    editorUiStore.hideLoading()
  }
}

export async function login (ctx, { username, password }) {
  await loginStore.login(username, password)
}

export async function logout (ctx) {
  if (!hexoEditorCore.state.saved) {
    await editorUiStore.confirm(null, '要退出么，未保存的文件会丢失', '退出', 'red', '返回', 'primary', 'cancel', async resolve => {
      await loginStore.logout()
    })
  } else {
    await destroy()
    await loginStore.logout()
  }
}

export async function editPostById (ctx, payload = { force: false }) {
  const { _id, force } = payload
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

export async function viewPostById (ctx, payload = { force: false }) {
  const { _id, force } = payload
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

export async function deletePostById (ctx, _id) {
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

export async function addPostByDefault (ctx) {
  try {
    await hexoEditorCore.addPostByDefault()
    await editorUiStore.editPost()
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '新建失败', caption: err.message })
  }
}

export async function publishPostById (ctx, _id) {
  await hexoEditorCore.publishPostById(_id)
}

export async function unpublishPostById (ctx, _id) {
  return editorUiStore.confirm(null, '你确认要取消发布么？取消后无法撤销，再次发布的文章地址也会变更', '取消发布', 'red', null, 'primary', 'cancel', async resolve => {
    await hexoEditorCore.unpublishPostById(_id)
    resolve()
  })
}

export async function setPostByCategoriesArray2d (ctx, cats) {
  await hexoEditorCore.setPostByCategoriesArray2d(cats)
}
export async function setPostByTitle (ctx, title) {
  await hexoEditorCore.setPostByTitle(title)
}
export async function setPostByContent (ctx, content) {
  await hexoEditorCore.setPostByContent(content)
}
export async function setPostByTags (ctx, tags) {
  await hexoEditorCore.setPostByTags(tags)
}

export async function filterByCategoriesId (ctx, _id) {
  await hexoEditorCore.filterByCategoriesId(_id)
}

export async function filterByTagsId (ctx, _id) {
  await hexoEditorCore.filterByTagsId(_id)
}

export async function filterByAll (ctx) {
  await hexoEditorCore.filterByAll()
}

export async function filterByUnCategorized (ctx) {
  await hexoEditorCore.filterByUnCategorized()
}

export async function deploy (ctx) {
  await editorUiStore.confirm(null, '确定部署博客么？', null, null, null, null, 'ok', async resolve => {
    try {
      editorUiStore.showLoading({ message: '正在部署', delay: 100 })
      await hexoEditorCore.deploy()
      message.success({ message: '部署完成' })
    } catch (err) {
      message.error({ message: '部署失败', caption: err.message })
    } finally {
      editorUiStore.hideLoading()
      resolve()
    }
  })
}

export async function syncGit (ctx) {
  await editorUiStore.confirm(null, '确定从git同步么？未保存到git的文件将丢失', '放弃文件并同步', 'red', '返回', 'primary', 'cancel', async resolve => {
    try {
      editorUiStore.showLoading({ message: '正在从GIT同步', delay: 100 })
      await hexoEditorCore.syncGit()
      message.success({ message: '同步完成' })
    } catch (err) {
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      editorUiStore.hideLoading()
      resolve()
    }
  })
}

export async function saveGit (ctx) {
  try {
    editorUiStore.showLoading({ message: '正在同步到GIT', delay: 100 })
    await hexoEditorCore.saveGit()
    message.success({ message: '同步完成' })
  } catch (err) {
    message.error({ message: '同步失败', caption: err.message })
  } finally {
    editorUiStore.hideLoading()
  }
}

export async function reload (ctx, force = false) {
  try {
    editorUiStore.showLoading({ delay: 500 })
    await hexoEditorCore.reload(force)
    message.success({ message: '重载成功' })
  } catch (err) {
    if (err.status === 401) return
    message.error({ message: '重载失败', caption: err.message })
  } finally {
    editorUiStore.hideLoading()
  }
}

export async function savePost (ctx) {
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

export async function toggleFull (ctx) {
  await editorUiStore.toggleFull()
}

export async function togglePreview (ctx) {
  await editorUiStore.togglePreview()
}

export const destroy = async () => {
  await editorUiStore.destory()
  await hexoEditorCore.destory()
}
