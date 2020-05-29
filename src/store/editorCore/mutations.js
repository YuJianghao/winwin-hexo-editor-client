import Vue from 'vue'
import { listToObject } from 'src/utils/common'

// post state

export function loadPost (state, post) {
  state.data.post = post
  markSaved(state)
}

export function updatePostByOptions (state, opt = {}) {
  const post = Object.assign({}, state.data.post)
  updatePost(state, Object.assign(post, opt))
}

/**
 *
 * @param {Object} opt 参数
 * @param {Object} [opt.update] 需要更新的数据
 * @param {Array} [opt.remove] 需要删除的键
 */
export function updatePostByFrontmatters (state, opt = {}) {
  const update = opt.update || {}
  const remove = opt.remove || []
  updatePostByOptions(state, update)
  remove.map(key => Vue.delete(state.data.post, key))
}

export function updatePostByTitle (state, title) {
  updatePostByOptions(state, { title })
}

export function updatePostByContent (state, content) {
  updatePostByOptions(state, { _content: content })
}

export function updatePostByTags (state, tags) {
  updatePostByOptions(state, { tags })
}

export function updatePostByCategories (state, categories) {
  updatePostByOptions(state, { categories })
}

export function updatePostByCategoriesArray2D (state, categoriesArray2D) {
  let categories = []
  if (categoriesArray2D.length === 1) {
    if (categoriesArray2D[0].length === 1) {
      categories = categoriesArray2D[0][0]
    } else {
      categories = categoriesArray2D[0]
    }
  } else {
    categories = categoriesArray2D
  }
  updatePostByCategories(state, categories)
}

export function closePost (state) {
  state.data.post = null
}

export function updatePost (state, post) {
  state.data.post = post
  markChanged(state)
}

export function savePost (state) {
  markSaved(state)
}

// other state

export function loadPosts (state, posts) {
  state.data.posts = posts
}
export function loadPostsByList (state, posts) {
  loadPosts(state, listToObject(posts))
}

export function loadCategories (state, categories) {
  state.data.categories = categories
}
export function loadCategoriesByList (state, posts) {
  loadCategories(state, listToObject(posts))
}

export function loadTags (state, tags) {
  state.data.tags = tags
}
export function loadTagsByList (state, posts) {
  loadTags(state, listToObject(posts))
}

export function resetAll (state) {
  resetPosts(state)
  resetCategories(state)
  resetTags(state)
}

export function resetPosts (state, posts) {
  state.data.posts = {}
}

export function resetCategories (state, categories) {
  state.data.categories = {}
}

export function resetTags (state, tags) {
  state.data.tags = {}
}

// change editor status

export function markChanged (state) {
  state.status.saved = false
}

export function markSaved (state) {
  state.status.saved = true
}
