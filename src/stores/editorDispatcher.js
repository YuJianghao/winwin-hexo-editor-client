
import hexo from '@winwin/hexo-editor-sdk'
import { hexoEditorCore } from '../stores/editorStore'
import request from '../api/request'
import { editorUiStore } from './editorUiStore'

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
  await hexoEditorCore.loadPostById(_id, force)
  await editorUiStore.editPost()
}

export async function viewPostById (_id, force = false) {
  await hexoEditorCore.loadPostById(_id, force)
  await editorUiStore.viewPost()
}

export async function deletePostById (_id) {
  try {
    await editorUiStore.deletePost()
    await hexoEditorCore.deletePostById(_id)
  } catch (err) {
    if (hexoEditorCore.state.post) { await editorUiStore.viewPost() }
  }
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
  await hexoEditorCore.deploy()
}

export async function syncGit () {
  await hexoEditorCore.syncGit()
}

export async function saveGit () {
  await hexoEditorCore.saveGit()
}

export async function reload () {
  await hexoEditorCore.reload()
}
export async function savePost () {
  await hexoEditorCore.savePost()
}
export async function toggleFull () {
  await editorUiStore.toggleFull()
}

export async function destroy () {
  await hexoEditorCore.destory()
  await editorUiStore.destory()
}
