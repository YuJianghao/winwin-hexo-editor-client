/*
export function someAction (context) {
}
*/

import stringRandom from 'string-random'
import { Logger } from 'src/utils/logger'
import * as hexoService from 'src/service/hexo'
import { replaceErrorMessage } from 'src/utils/common'
const logger = new Logger({ prefix: 'EditorCore/Actions' })

// TODO: 确认文章编辑没有漏洞
export async function init ({ commit, dispatch }) {
  commit('closePost')
  await dispatch('loadAll')
}

export async function destroy ({ commit }) {
  commit('closePost')
  commit('resetAll')
}

export async function reload ({ dispatch }, force) {
  await dispatch('loadAll')
}

// CURD

export async function addPostBase ({ state, getters, commit, dispatch }, payload = {}) {
  if (!payload.force && !state.status.saved) throw new Error('Unsaved file, use force=true to override')
  let post = null
  try {
    const defaultOpt = {
      title: '新文章',
      slug: stringRandom(16)
    }
    post = await hexoService.addPost(Object.assign(defaultOpt, payload.options))
  } catch (err) {
    throw replaceErrorMessage(err, '新建文章失败，请稍后再试')
  }
  try {
    await dispatch('loadPosts')
    if (post.categories) await dispatch('loadCategories')
    if (post.tags) await dispatch('loadTags')
    commit('loadPost', post)
    commit('markSaved')
  } catch (err) {
    throw replaceErrorMessage(err, '新文章创建成功，但数据更新失败，请手动刷新')
  }
}

export async function loadPostById ({ state, getters, commit }, { _id, force }) {
  if (!state.data.post && !_id) throw new Error('No post opened, _id is required!')
  if (_id && !state.data.posts[_id]) throw new Error('Invalid post id ' + _id)
  if (state.data.post && state.data.post._id === _id) {
    logger.log('Same post', _id)
    return
  }
  if (!state.status.saved && !force) throw new Error('Unsaved change, use force=true to override.')
  try {
    const post = await hexoService.getPostById(_id || state.data.post._id)
    commit('loadPost', post)
  } catch (err) {
    throw replaceErrorMessage(err, '文章获取失败，请稍后再试')
  }
}

export async function loadAll ({ dispatch }) {
  await Promise.all([
    dispatch('loadPosts'),
    dispatch('loadCategories'),
    dispatch('loadTags')
  ])
}

export async function loadPosts ({ commit }) {
  try {
    const posts = await hexoService.getPosts()
    commit('loadPostsByList', posts)
  } catch (err) {
    throw replaceErrorMessage(err, '文章列表获取失败，请稍后再试')
  }
}

export async function loadCategories ({ commit }) {
  try {
    const categories = await hexoService.getCategories()
    commit('loadCategoriesByList', categories)
  } catch (err) {
    throw replaceErrorMessage(err, '分类获取失败，请稍后再试')
  }
}

export async function loadTags ({ commit }) {
  try {
    const tags = await hexoService.getTags()
    commit('loadTagsByList', tags)
  } catch (err) {
    throw replaceErrorMessage(err, '标签获取失败，请稍后再试')
  }
}

export async function deletePostById ({ state, commit, dispatch }, _id) {
  if (!state.data.post && !state.data.posts[_id]) throw new Error('Invalid post id ' + _id)
  try {
    await hexoService.deletePostById(_id || state.data.post._id)
    await dispatch('reload')
  } catch (err) {
    throw replaceErrorMessage(err, '删除失败，请稍后再试')
  }
}

export async function savePost (state, dispatch, commit) {
  try {
    await hexoService.savePost(state.data.post)
    commit('savePost')
  } catch (err) {
    throw replaceErrorMessage(err, '保存失败，请稍后再试')
  }
  try {
    await dispatch('loadAll')
  } catch (err) {
    throw replaceErrorMessage(err, '文章已保存，但数据更新失败，请手动刷新')
  }
}
