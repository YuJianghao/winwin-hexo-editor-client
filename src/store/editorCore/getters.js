import { objectToList } from 'src/utils/common'

/*
export function someGetter (state) {
}
*/
export function dataPostsCount (state) {
  return objectToList(state.data.posts).length
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
  if (!state.data.post.categories) return [[]]
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

export function dataCategoriesList (state) {
  return objectToList(state.data.categories)
}
export function dataCategoriesNameList (state) {
  return dataCategoriesList(state).map(category => category.name)
}
export function dataUnCategoriesCount (state) {
  return objectToList(state.data.posts).filter(post => !post.categories).length
}
