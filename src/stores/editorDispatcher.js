
import hexo from '@winwin/hexo-editor-sdk'
import { hexoEditorCore } from '../stores/editorStore'
import request from '../api/request'
import { editorUiState } from './editorUiStore'

export async function init () {
  await hexoEditorCore.init({
    api: hexo({
      baseUrl: process.env.HEXO_SERVER_BASE,
      axios: request
    }),
    debug: process.env.DEV
  })
  await editorUiState.init()
}

export async function editPostById (_id, force = false) {
  await hexoEditorCore.loadPostById(_id, force)
  await editorUiState.editPost()
}

export async function deletePostById (_id) {
  try {
    await editorUiState.deletePost()
    await hexoEditorCore.deletePostById(_id)
  } catch (err) {
    if (hexoEditorCore.state.post) { await editorUiState.viewPost() }
  }
}

export async function addPostByDefault () {
  await hexoEditorCore.addPostByDefault()
}

export async function publishPostById (_id) {
  await hexoEditorCore.publishPostById(_id)
}

export async function unpublishPostById (_id) {
  await hexoEditorCore.unpublishPostById(_id)
}

export async function reload () {
  await hexoEditorCore.reload()
}
export async function savePost () {
  await hexoEditorCore.savePost()
}
export async function toggleFull () {
  await editorUiState.toggleFull()
}

export async function destroy () {
  await hexoEditorCore.destory()
  await editorUiState.destory()
}
