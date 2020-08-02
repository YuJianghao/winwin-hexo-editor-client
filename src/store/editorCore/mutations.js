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
