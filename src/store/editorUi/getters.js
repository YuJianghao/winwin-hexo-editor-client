export function unselect (state, getters, rootState) {
  return !rootState.editorCore.data.post && !state.editing && !state.preview
}
export function editing (state) {
  return state.editing
}
export function viewing (state) {
  return state.preview && !state.editing
}
