export function unselect (state, getters, rootState) {
  return !rootState.editorCore.data.article
}
export function editing (state, getters, rootState) {
  return state.editing
}
export function viewing (state, getters, rootState) {
  return state.preview
}
