/*
export function someGetter (state) {
}
*/

export function postsList (state, getters, rootState, rootGetters) {
  // TODO: 实现过滤后文章列表
  return rootGetters['editorCore/dataPostsList']
}

export function postsCount (state, getters) {
  return getters.postsList.count()
}

export function postsEmpty (state, getters) {
  return getters.postsCount === 0
}
