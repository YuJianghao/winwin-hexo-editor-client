import { Logger } from 'src/utils/logger'
import { hexoEditorCore } from 'src/stores/editorStore'
import { listToObject } from 'src/utils/common'
import Vue from 'vue'

const logger = new Logger({ prefix: 'EditorCore' })
/*
export function someMutation (state) {
}
*/

// update data base

export function updateDataPostBase (state, post) {
  state.data.post = post
  if (state.data.post && typeof post.categories === 'undefined') {
    Vue.set(state.data.post, 'categories', null)
  }
  logger.warn('post', state.data.post, hexoEditorCore.state)
  markSaved(state)
}

export function updateDataPostById (state, _id) {
  if (!Object.keys(state.data.posts).includes(_id)) {
    logger.warn('Post with id', _id, 'doesn\'t exist. Returning.')
    return
  }
  if (state.data.post && state.data.post._id === _id) {
    logger.warn('Post already loaded. Returning.')
  } else {
    updateDataPostBase(state.data.posts[_id])
  }
}

export function updateDataPostByTitle (state, title) {
  updateDataPostBase(state, Object.assign(state.data.post, { title }))
}

export function updateDataPostByContent (state, content) {
  updateDataPostBase(state, Object.assign(state.data.post, { _content: content }))
}

export function updateDataPostByTags (state, tags) {
  updateDataPostBase(state, Object.assign(state.data.post, { tags }))
}

export function updateDataPostByCategories (state, categories) {
  updateDataPostBase(state, Object.assign(state.data.post, { categories }))
}

export function updateDataPostByCategoriesArray2D (state, categoriesArray2D) {
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
  updateDataPostByCategories(state, categories)
}

export function updateDataPostByOptions (state, opt = {}) {
  updateDataPostBase(Object.assign(state.data.post, opt))
}

export function updateDataPostsBase (state, posts) {
  state.data.posts = posts
  logger.warn('posts', state.data.posts, hexoEditorCore.state)
}
export function updateDataPostsByList (state, posts) {
  updateDataPostsBase(state, listToObject(posts))
}

export function updateDataCategoriesBase (state, categories) {
  state.data.categories = categories
  logger.warn('categories', state.data.categories, hexoEditorCore.state)
}
export function updateDataCategoriesByList (state, categories) {
  updateDataCategoriesBase(state, listToObject(categories))
}

export function updateDataTagsBase (state, tags) {
  state.data.tags = tags
  logger.warn('tags', state.data.tags, hexoEditorCore.state)
}
export function updateDataTagsByList (state, posts) {
  updateDataTagsBase(state, listToObject(posts))
}

// change editor status

export function markChanged (state) {
  state.status.saved = false
}

export function markSaved (state) {
  state.status.saved = true
}

export function markReady (state) {
  state.status.ready = true
}
