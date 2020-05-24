import { Dialog } from 'quasar'

export function confirmDialog (title, message, okLabel, okColor, cancelLabel, cancelColor, focus = 'ok', onOk, onCancel, onDismiss) {
  if (!message) throw new Error('message is required')
  return new Promise(resolve => {
    Dialog.create({
      title: title || '确认',
      message: message,
      ok: {
        label: okLabel || '确定',
        color: okColor || 'primary',
        flat: true
      },
      cancel: {
        label: cancelLabel || '返回',
        color: cancelColor || 'grey',
        flat: true
      },
      focus
    }).onOk(async () => {
      if (onOk) { onOk(resolve) } else resolve()
    }).onCancel(() => {
      if (onCancel) { onCancel(resolve) } else resolve()
    }).onDismiss(() => {
      if (onDismiss) { onDismiss(resolve) } else resolve()
    })
  })
}
