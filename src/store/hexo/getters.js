import LTT from 'list-to-tree'
export function modifiedPost(state) {
  return id => {
    const obj = {}
    Object.assign(obj, state.posts.data[id].data)
    Object.assign(obj, state.posts.data[id].modify)
    return obj
  }
}
export function categoriesTreeNodes(state) {
  const obj = state.categories.data
  const list = Object.keys(obj).map(key => obj[key].data).map(obj => {
    if (obj.parent === undefined) obj.parent = 0
    return obj
  })
  const ltt = new LTT(list, {
    key_id: '_id',
    key_parent: 'parent',
    key_child: '_child'
  })
  return ltt.GetTree() || []
}
export function tagsList(state) {
  const obj = state.tags.data
  return Object.keys(obj).map(key => obj[key].data)
}
export function postCount(state) {
  return Object.keys(state.posts.data).length
}
export function pageCount(state) {
  return Object.keys(state.pages.data).length
}
export function totalCount(state) {
  return Object.keys(state.posts.data).length + Object.keys(state.pages.data).length
}
export function draftCount(state) {
  const postsObj = state.posts.data
  const postsList = Object.keys(postsObj).map(key => postsObj[key].data)
  return postsList.filter(p => !p.published).length
}
