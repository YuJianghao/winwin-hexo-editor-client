import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'EditorUI/Mutations' })
// import { Dialog } from 'quasar'

/*
export function someMutation (state) {
}
*/
export function init (state) {
  state.full = false
  hideLoading(state)
}
export function destroy (state) {
  state.full = false
  hideLoading(state)
}
export function showLoading (state, payload = {}) {
  logger.log('showLoading')
  state.loading.show = true
}
export function hideLoading (state) {
  logger.log('hideLoading')
  state.loading.show = false
}
export function toggleFull (state, full) {
  logger.log('toggleFull')
  if (typeof full === 'undefined') state.full = !state.full
  else state.full = !!full
}
