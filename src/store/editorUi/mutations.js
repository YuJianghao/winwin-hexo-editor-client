import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'EditorUI/Mutations' })
// import { Dialog } from 'quasar'

/*
export function someMutation (state) {
}
*/
export function init (state) {
  state.full = false
  state.post = 'unselect'
  state.preview = false
}
export function destroy (state) {
  this.full = false
  state.post = 'unselect'
  state.preview = false
}

export function showLoading (state, payload = {}) {
  state.message = payload.message
  state.loading.show = true
}
export function hideLoading (state) {
  state.message = ''
  state.loading.show = false
}

export function editPost (state) {
  logger.log('post editing')
  state.post = 'editing'
  state.preview = true
}
export function viewPost (state) {
  logger.log('post viewing')
  state.post = 'viewing'
}
export function closePost (state) {
  logger.log('post unselect')
  state.post = 'unselect'
  state.preview = false
}
export function toggleFull (state, full) {
  if (typeof full === 'undefined') state.full = !state.full
  else state.full = !!full
}
export function togglePreview (state, preview) {
  if (typeof preview === 'undefined') state.preview = !state.preview
  else state.preview = !!preview
}
