import Vue from 'vue'
import { listToObject } from 'src/utils/common'

// post state

export function loadPost (state, post) {
  state.data.post = post
  markSaved(state)
}

export function markUpdateKey (state, key) {
  if (!state.data.post || !state.data.post._whe_delete) return
  if (state.data.post._whe_delete.indexOf(key) === -1) return
  state.data.post._whe_delete.splice(state.data.post._whe_delete.indexOf(key), 1)
  if (state.data.post._whe_delete.length === 0) {
    Vue.delete(state.data.post, '_whe_delete')
  }
}

export function markDeleteKey (state, key) {
  if (!state.data.post) return
  if (!state.data.post._whe_delete) state.data.post._whe_delete = []
  state.data.post._whe_delete.push(key)
}

export function updatePostByOptions (state, opt = {}) {
  Object.keys(opt).map(key => markUpdateKey(state, key))
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
  const restrictedKeys = [
    '_id',
    '_content',
    'slug',
    'date',
    'updated',
    'raw',
    'layout',
    'published',
    'title',
    'tags',
    'category',
    'categories',
    '_whe_delete',
    '_whe_brief'
  ]
  restrictedKeys.map(key => {
    delete update[key]
  })
  const remove = opt.remove || []
  remove.map(key => {
    if (!restrictedKeys.includes(key)) {
      Vue.delete(state.data.post, key)
      markDeleteKey(state, key)
    }
  })
  updatePostByOptions(state, update)
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
