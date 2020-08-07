import { Logger } from 'src/utils/logger'

const logger = new Logger({ prefix: 'EditorFilter/getters' })
/*
export function someGetter (state) {
}
*/

export function postsList (state, getters, rootState, rootGetters) {
  const posts = rootState.editorCore.data.articles
  const postsList = rootGetters['editorCore/dataPostsList']
  const categories = rootState.editorCore.data.categories
  const tags = rootState.editorCore.data.tags
  try {
    if (state.type === 'all') return postsList
    if (state.type === 'categories') return categories[state._id].posts.map(_id => posts[_id])
    if (state.type === 'tags') return tags[state._id].posts.map(_id => posts[_id])
    if (state.type === 'uncategorized') return postsList.filter(post => !post.categories)
    throw new Error('invalid')
  } catch (err) {
    logger.error(err)
    logger.warn(`invalid type ${state.type} with _id ${state._id}, returning postsList`)
    return rootGetters['editorCore/dataPostsList']
  }
}

export function postsCount (state, getters) {
  return getters.postsList.length
}

export function postsEmpty (state, getters) {
  return getters.postsCount === 0
}
