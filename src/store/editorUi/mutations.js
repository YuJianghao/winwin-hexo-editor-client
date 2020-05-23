import { hexoEditorCore } from 'src/stores/editorStore'
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
  if (process.env.DEV) console.log('set editor ui post editing')
  state.post = 'editing'
  state.preview = true
}
export function viewPost (state) {
  if (process.env.DEV) console.log('set editor ui post viewing')
  state.post = 'viewing'
}
export function closePost (state) {
  if (process.env.DEV) console.log('set editor ui post unselect')
  state.post = 'unselect'
  state.preview = false
}
export function deletePost (state, _id) {
  if (!_id) this.closePost()
  if (hexoEditorCore.state.post && hexoEditorCore.state.post._id === _id) { this.closePost() }
}

export function toggleFull (state, full) {
  if (typeof full === 'undefined') state.full = !state.full
  else state.full = !!full
}
export function togglePreview (state, preview) {
  if (typeof preview === 'undefined') state.preview = !state.preview
  else state.preview = !!preview
}
// export function confirm (state, title, payload = {}) {
//   const { message, okLabel, okColor, cancelLabel, cancelColor, focus = 'ok', onOk, onCancel, onDismiss } = payload
//   if (!message) throw new Error('message is required')
//   return new Promise(resolve => {
//     Dialog.create({
//       title: title || '确认',
//       message: message,
//       ok: {
//         label: okLabel || '确定',
//         color: okColor || 'primary',
//         flat: true
//       },
//       cancel: {
//         label: cancelLabel || '返回',
//         color: cancelColor || 'grey',
//         flat: true
//       },
//       focus
//     }).onOk(async () => {
//       if (onOk) { onOk(resolve) } else resolve()
//     }).onCancel(() => {
//       if (onCancel) { onCancel(resolve) } else resolve()
//     }).onDismiss(() => {
//       if (onDismiss) { onDismiss(resolve) } else resolve()
//     })
//   })
// }
