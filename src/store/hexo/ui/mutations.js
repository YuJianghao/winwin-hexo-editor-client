export function init (state) {
  state.full = false
  hideLoading(state)
}
export function destroy (state) {
  state.full = false
  hideLoading(state)
}
export function showLoading (state, payload = {}) {
  state.loading.show = true
}
export function hideLoading (state) {
  state.loading.show = false
}
export function toggleFull (state, full) {
  if (typeof full === 'undefined') state.full = !state.full
  else state.full = !!full
}
