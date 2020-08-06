import { objectToList } from 'src/utils/common'

// post status

export function isPostSaved (state) {
  return state.status.saved
}

// ============

export function dataPostsCount (state) {
  return dataPostsList(state).length
}
export function dataPostsList (state) {
  return objectToList(state.data.articles)
}
export function dataPostId (state) {
  return state.data.article ? state.data.article._id : null
}
export function dataPostPublished (state) {
  return state.data.article ? state.data.article.published : false
}
export function dataPostTagsList (state) {
  if (!state.data.article) return []
  return state.data.article.tags || []
}
export function dataPostCategoriesArray2d (state) {
  if (!state.data.article || !state.data.article.categories) return [[]]
  if (!Array.isArray(state.data.article.categories)) return [[state.data.article.categories]]
  else {
    if (!state.data.article.categories.filter(cat => Array.isArray(cat)).length) { return [state.data.article.categories] }
    return state.data.article.categories.map(cat => {
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
  return objectToList(state.data.articles).filter(post => !post.tags).length
}

export function dataCategoriesList (state) {
  return objectToList(state.data.categories)
}
export function dataCategoriesNameList (state) {
  return dataCategoriesList(state).map(category => category.name)
}
export function dataUnCategoriesCount (state) {
  return objectToList(state.data.articles).filter(post => !post.categories).length
}
