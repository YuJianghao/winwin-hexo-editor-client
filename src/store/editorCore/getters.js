import { objectToList, isEmptyObject } from 'src/utils/common'
import { Logger } from 'src/utils/logger'
import LTT from 'list-to-tree'
const logger = new Logger({ prefix: 'editorCore/getters' })
/*
export function someGetter (state) {
}
*/

// post status

export function isPostInit (state) {
  return state.data.post !== null
}
export function isPostSaved (state) {
  return state.status.saved
}
export function isPostUnsaved (state) {
  return !state.status.saved
}
export function postStatus (state) {
  if (isPostInit(state)) return 'init'
  if (isPostSaved(state)) return 'saved'
  if (isPostUnsaved(state)) return 'unsaved'
  logger.error('Unknown state', state)
  return 'error'
}

// other status

export function isOtherInit (state) {
  return isEmptyObject(state.data.posts) &&
    isEmptyObject(state.data.categories) &&
    isEmptyObject(state.data.tags)
}

export function isOtherReady (state) {
  return !isOtherInit(state)
}

export function otherStatus (state) {
  if (isOtherInit(state)) return 'init'
  if (isOtherReady(state)) return 'ready'
  logger.error('Unknown state', state)
  return 'error'
}

// ============

export function dataPostId (state) {
  return state.post ? state.post._id : null
}
export function dataPostsCount (state) {
  return dataPostsList(state).length
}
export function dataPostsList (state) {
  return objectToList(state.data.posts)
}

export function dataPostEmpty (state) {
  return !!state.data.post
}
export function dataPostPublished (state) {
  return state.data.post ? state.data.post.published : false
}
export function dataPostTagsList (state) {
  if (!state.data.post) return []
  return state.data.post.tags || []
}
export function dataPostCategoriesArray2d (state) {
  if (!state.data.post || !state.data.post.categories) return [[]]
  if (!Array.isArray(state.data.post.categories)) return [[state.data.post.categories]]
  else {
    if (!state.data.post.categories.filter(cat => Array.isArray(cat)).length) { return [state.data.post.categories] }
    return state.data.post.categories.map(cat => {
      return Array.isArray(cat) ? cat : [cat]
    })
  }
}
export function dataPostCategoriesList (state) {
  return dataPostCategoriesArray2d(state)[0]
}
export function dataTagsList (state) {
  return objectToList(state.data.tags)
}
export function dataTagsNameList (state) {
  return dataTagsList(state).map(tag => tag.name)
}
export function dataUnTagCount (state) {
  return objectToList(state.data.posts).filter(post => !post.tags).length
}

export function dataCategoriesTreeList (state) {
  try {
    const list = dataCategoriesList(state).map(category => {
      const newObj = {}
      if (!category.parent)newObj.parent = 0
      return Object.assign(newObj, category)
    })
    const ltt = new LTT(list, {
      key_id: '_id',
      key_parent: 'parent',
      key_child: '_child'
    })
    return ltt.GetTree() || []
  } catch (e) {
    logger.error('dataCategoriesTreeList', e)
  }
}
export function dataCategoriesList (state) {
  return objectToList(state.data.categories)
}
export function dataCategoriesNameList (state) {
  return dataCategoriesList(state).map(category => category.name)
}
export function dataUnCategoriesCount (state) {
  return objectToList(state.data.posts).filter(post => !post.categories).length
}
