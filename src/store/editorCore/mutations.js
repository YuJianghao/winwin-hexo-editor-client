import { Logger } from 'src/utils/logger'
import { hexoEditorCore } from 'src/stores/editorStore'
import { listToObject } from 'src/utils/common'

const logger = new Logger({ prefix: 'EditorCore' })
/*
export function someMutation (state) {
}
*/

// update data base

export function updateDataPostBase (state, post) {
  state.data.post = post
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

export function updateDataPostByOptions (state, opt = {}) {
  updateDataPostBase(Object.assign(state.data.post, opt))
}

export function updateDataPostsBase (state, posts) {
  state.data.posts = posts
  logger.warn('posts', state.data.posts, hexoEditorCore.state)
}
export function updateDataPostsByList (state, posts) {
  updateDataCategoriesBase(state, listToObject(posts))
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
