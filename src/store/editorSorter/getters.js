/*
export function someGetter (state) {
}
*/
export function postsList (state, getter, rootState, rootGetters) {
  let postsList = rootGetters['editorFilter/postsList']
  postsList = postsList.sort((a, b) => {
    if (typeof a[state.key] === 'undefined') return -1
    return (a[state.key] > b[state.key]) ^ !state.direction ? 1 : -1
  })
  return postsList
}
