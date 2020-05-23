/*
export function someAction (context) {
}
*/

import request from 'src/api'
import stringRandom from 'string-random'
import { Logger } from 'src/utils/logger'
const hexo = request.hexo
const logger = new Logger({ prefix: 'EditorCore/Actions' })

// basic

export async function init ({ commit, dispatch }) {
  commit('updateDataPostBase', null)
  await dispatch('loadAll')
  commit('markReady')
}

export async function destroy ({ commit }) {
  commit('updateDataPostBase', null)
  commit('updateDataPostsBase', {})
  commit('updateDataCategoriesBase', {})
  commit('updateDataTagsBase', {})
}

export async function reload ({ dispatch }) {
  await dispatch('loadAll')
}

// CURD

export async function addPostBase ({ state, commit, dispatch }, payload = {}) {
  if (!payload.force && !state.status.saved) throw new Error('Unsaved file, use force=true to override')
  const defaultOpt = {
    title: '新文章',
    slug: stringRandom(16)
  }
  const res = await hexo.addPost(Object.assign(defaultOpt, payload.options))
  await dispatch('loadPosts')
  if (res.data.categories) await dispatch('loadCategories')
  if (res.data.tags) await dispatch('loadTags')
  commit('updateDataPostBase', res.data.post)
  commit('markSaved')
}

export async function loadPostById ({ state, commit }, { _id, force }) {
  if (!state.status.ready) throw new Error('App initiating')
  if (!state.data.post && !_id) throw new Error('No post opened, _id is required!')
  if (_id && !state.data.posts[_id]) throw new Error('Invalid post id ' + _id)
  if (state.data.post && state.data.post._id === _id) {
    logger.log('Same post', _id)
    return
  }
  if (!state.status.saved && !force) throw new Error('Unsaved change, use force=true to override.')
  const res = await hexo.getPost(_id || state.data.post._id)
  commit('updateDataPostBase', res.data.post)
  commit('markSaved')
}

export async function loadAll ({ dispatch }) {
  await Promise.all([
    dispatch('loadPosts'),
    dispatch('loadCategories'),
    dispatch('loadTags')
  ])
}

export async function loadPosts ({ commit }) {
  const res = await hexo.getPosts()
  commit('updateDataPostsByList', res.data.posts)
}

export async function loadCategories ({ commit }) {
  const res = await hexo.getCategories()
  commit('updateDataCategoriesByList', res.data.categories)
}

export async function loadTags ({ commit }) {
  const res = await hexo.getTags()
  commit('updateDataTagsByList', res.data.tags)
}

export async function deletePostById ({ state, dispatch }, _id) {
  if (!state.data.posts[_id]) throw new Error('Invalid post id ' + _id)
  await hexo.deletePost(_id)
  await dispatch('reload')
}
