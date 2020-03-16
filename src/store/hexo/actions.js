/**
 * @module HexoActions
 */
import { Loading, QSpinnerGears } from 'quasar'
import random from 'string-random'
import apis from '../../api'
import message from '../../utils/message'

/**
 * 从服务器加载标签
 */
export async function loadTags ({ commit }) {
  const res = await apis.hexo.getTags()
  commit('SET_TAGS', res.data.tags)
}

/**
 * 清除本地标签缓存
 */
export async function clearTags ({ commit }) {
  commit('SET_TAGS', [])
}

/**
 * 从服务器加载分类
 */
export async function loadCategories ({ commit }) {
  const res = await apis.hexo.getCategories()
  commit('SET_CATEGORIES', res.data.categories)
}

/**
 * 清除本地分类缓存
 */
export async function clearCategories ({ commit }) {
  commit('SET_CATEGORIES', null)
}

/**
 * 从服务器加载文章列表
 */
export async function loadPosts ({ commit, state, dispatch }) {
  try {
    const res = await apis.hexo.getPosts()
    await dispatch('loadCategories')
    await dispatch('loadTags')
    commit('SET_POSTS', res.data.posts)
    if (state.post && state.posts[state.post._id]) {
      await dispatch('loadPost', state.post._id)
    } else {
      commit('SET_EDITING', false)
      commit('SET_POST', null)
    }
  } catch (err) {
    message.error({ message: '载入文章失败', caption: err.message })
  }
}

/**
 * 清除本地文章列表缓存
 */
export async function clearPosts ({ commit }) {
  commit('SET_POSTS', {})
  commit('SET_POST', null)
}

/**
 * 从服务器加载文章详情
 */
export async function loadPost ({ commit }, _id) {
  const res = await apis.hexo.getPost(_id)
  commit('SET_POST', res.data.post)
}

/**
 * 清除本地文章详情缓存
 */
export async function clearPost ({ commit }, _id) {
  commit('SET_POST', null)
}

/**
 * 发布文章
 */
export async function publishPost ({ commit, state, dispatch }) {
  try {
    const res = await apis.hexo.publishPost(state.post._id)
    dispatch('loadPosts')
    commit('SET_POST', res.data.post)
  } catch (err) {
    message.error({ message: '操作失败', caption: err.message })
  }
}

/**
 * 取消发布文章
 */
export async function unpublishPost ({ commit, state, dispatch }) {
  try {
    const res = await apis.hexo.unpublishPost(state.post._id)
    dispatch('loadPosts')
    commit('SET_POST', res.data.post)
  } catch (err) {
    message.error({ message: '操作失败', caption: err.message })
  }
}

/**
 * 新建文章
 */
export async function addPost ({ commit, state }) {
  try {
    const res = await apis.hexo.addPost({ title: '新文章', slug: random(16), layout: 'draft' })
    commit('UPDATE_POSTS', res.data.post)
    if (!state.editing) { commit('SET_POST', res.data.post) }
    commit('SET_EDITING', true)
  } catch (err) {
    message.error({ message: '新建失败', caption: err.message })
  }
}

/**
 * 保存文章
 */
export async function savePost ({ commit, state, dispatch }) {
  try {
    const res = await apis.hexo.updatePost(state.post._id, state.post)
    dispatch('loadCategories')
    dispatch('loadTags')
    commit('UPDATE_POSTS', res.data.post)
    commit('SET_POST', res.data.post)
    message.success({ message: '保存成功' })
  } catch (err) {
    message.error({ message: '保存失败', caption: err.message })
  }
}

/**
 * 删除文章
 * @param {String} [_id=state.post._id] - 文章id
 */
export async function deletePost ({ commit, state, dispatch }, _id) {
  if (!_id && !(state.post && state.post._id)) {
    throw new Error('_id is required : both _id and store.post._id are empty')
  }
  const res = await apis.hexo.deletePost(_id || state.post._id)
  await dispatch('loadPosts')
  dispatch('loadCategories')
  dispatch('loadTags')
  console.log(_id)
  console.log(state.post)
  commit('DELETE_POSTS', res.data.post._id)
}

/**
 * 查看文章详情
 * @param {String} [_id=state.post._id] - 文章id
 * @param {Boolean} reload - 是否强制重载文章详情，`true`则重载
 */
export async function viewPost ({ commit, state, dispatch }, _id, reload) {
  if (!_id && !(state.post && state.post._id)) {
    throw new Error('_id is required : both _id and store.post._id are empty')
  }
  // 如果没有选中文章，或者更换了文章，或者强制重载
  if (!state.post || (_id && state.post._id !== _id) || reload) {
    await dispatch('loadPost', _id)
  }
  commit('SET_EDITING', false)
}

/**
 * 编辑文章
 * @param {String} [_id=state.post._id] - 文章id
 * @param {Boolean} reload - 是否强制重载文章详情，`true`则重载
 */
export async function editPost ({ commit, state, dispatch }, _id, reload) {
  if (!_id && !(state.post && state.post._id)) {
    throw new Error('_id is required : both _id and store.post._id are empty')
  }
  // 如果没有选中文章，或者更换了文章，或者强制重载
  if (!state.post || (_id && state.post._id !== _id) || reload) {
    await dispatch('loadPost', _id)
  }
  commit('SET_EDITING', true)
}

/**
 * 从给定值更新文章分类
 * @param {String[][]} cats - 以二维数组方式存储的分类
 */
export async function setCategoriesArray2d ({ commit }, cats) {
  if (cats.length === 1) {
    if (cats[0].length === 1) {
      commit('SET_POST_CATS', cats[0][0])
    } else {
      commit('SET_POST_CATS', cats[0])
    }
  } else {
    commit('SET_POST_CATS', cats)
  }
}

/**
 * 切换编辑器占比
 */
export async function toggleFull ({ commit, state }) {
  commit('SET_FULL', !state.full)
}

export async function deploy () {
  try {
    Loading.show({
      message: '正在部署...',
      spinner: QSpinnerGears
    })
    await apis.hexo.deploy()
    message.success({ message: '完成' })
  } catch (err) {
    message.error({ message: '部署失败..', caption: err.message })
  } finally {
    Loading.hide()
  }
}

export async function syncGit () {
  try {
    Loading.show({
      message: '正在从GIT同步...'
    })
    await apis.hexo.syncGit()
    message.success({ message: '完成' })
  } catch (err) {
    message.error({ message: '同步失败..', caption: err.message })
  } finally {
    Loading.hide()
  }
}

export async function saveGit () {
  try {
    Loading.show({
      message: '正在同步到GIT...'
    })
    await apis.hexo.saveGit()
    message.success({ message: '完成' })
  } catch (err) {
    message.error({ message: '同步失败..', caption: err.message })
  } finally {
    Loading.hide()
  }
}
