export function modifiedPost(state) {
  return id => {
    const obj = {}
    Object.assign(obj, state.posts.data[id].data)
    Object.assign(obj, state.posts.data[id].modify)
    return obj
  }
}
