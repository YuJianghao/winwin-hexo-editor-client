export function unselect (state) {
  return state.post === 'unselect'
}
export function editing (state) {
  return state.post === 'editing'
}
export function viewing (state) {
  return state.post === 'viewing' || state.preview
}
