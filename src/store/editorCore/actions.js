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
  await Promise.all([
    dispatch('loadAll')
  ])
}

export async function destroy ({ commit }) {
  commit('updateDataPostBase', null)
  commit('updateDataPostsBase', {})
  commit('updateDataCategoriesBase', {})
  commit('updateDataTagsBase', {})
}

// CURD

export async function addPostBase ({ commit, dispatch }, opt) {
  const options = {}
  options.title = opt.title || '新文章'
  options.slug = opt.slug || stringRandom(16)
  const res = await hexo.addPost(options)
  await dispatch('loadAll')
  commit('updateDataPostBase', res.data.post)
}

export async function loadPostById ({ state, commit }, { _id, force }) {
  if (!state.data.post && !_id) throw new Error('No post opened, _id is required!')
  if (!state.data.posts[_id]) throw new Error('Invalid post id', _id)
  if (state.data.post && state.data.post._id === _id) {
    logger.warn('Same post', _id)
    return
  }
  if (!state.status.saved && !force) throw new Error('Unsaved change, use force=true to override.')
  const res = await hexo.getPost({ id: _id })
  commit('updatePostBase', res.data.post)
  commit('marksaved')
}

export async function loadAll ({ dispatch }) {
  await Promise.all([
    dispatch('loadPosts'),
    dispatch('loadCategories'),
    dispatch('loadTags')]
  )
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

export async function updatePost (ctx) {

}

export async function deletePost (ctx) {

}
