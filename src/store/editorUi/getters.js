export function unselect (state, getters, rootState) {
  return !rootState.editorCore.data.post
}
export function editing (state, getters, rootState) {
  return state.editing && rootState.editorCore.data.post
}
export function viewing (state, getters, rootState) {
  return state.preview && !state.editing && rootState.editorCore.data.post
}
