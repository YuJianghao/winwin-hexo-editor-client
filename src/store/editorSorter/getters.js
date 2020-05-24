/*
export function someGetter (state) {
}
*/
const pinyin = require('pinyin')
export function postsList (state, getter, rootState, rootGetters) {
  let postsList = rootGetters['editorFilter/postsList']
  postsList = postsList.sort((a, b) => {
    if (typeof a[state.key] === 'undefined') return -1
    let valueA = a[state.key]
    let valueB = b[state.key]
    if (typeof valueA === 'string') {
      valueA = pinyin(valueA, { style: pinyin.STYLE_NORMAL }).join('')
      valueB = pinyin(valueB, { style: pinyin.STYLE_NORMAL }).join('')
    }
    return valueA > valueB ^ !state.direction ? 1 : -1
  })
  return postsList
}
