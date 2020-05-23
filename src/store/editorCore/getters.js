import { objectToList } from 'src/utils/common'

/*
export function someGetter (state) {
}
*/
export function dataPostsCount (state) {
  return objectToList(state.data.posts).length
}
export function dataPostTagsList (state) {
  if (!state.data.post) return []
  return state.data.post.tags || []
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
export function dataUnCategoriesCount (state) {
  return objectToList(state.data.posts).filter(post => !post.categories).length
}
export function dataCategoriesArray2d (state) {
  const categories = state.data.post.categories
  if (!categories) return [[]]
  if (!Array.isArray(categories)) return [[categories]]
  else {
    if (!categories.filter(cat => Array.isArray(cat)).length) { return [categories] }
    return categories.map(cat => {
      return Array.isArray(cat) ? cat : [cat]
    })
  }
}
