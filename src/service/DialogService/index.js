import { objectHasKey } from 'src/utils/object'
import { Dialog } from 'quasar'
import NewPostDialog from './components/NewPostDialog'
import * as dialogTypes from 'src/service/DialogService/dialog-types'

class DialogService {
  constructor () {
    this._dialogs = {}
  }

  registerDialog (name, dialog) {
    if (objectHasKey(this._dialogs, name)) {
      throw new Error('duplicate name')
    }
    this._dialogs[name] = { name, dialog }
  }

  async create (name, opt) {
    return new Promise((resolve, reject) => {
      return this._dialogs[name].dialog(opt, resolve, reject)
    })
  }
}
const dialogService = new DialogService()

dialogService.registerDialog(dialogTypes.NewPostDialog, (opt, resolve) => {
  Dialog.create({
    component: NewPostDialog
  })
    .onOk(e => resolve({ type: 'ok', data: e }))
    .onCancel(e => resolve({ type: 'cancel', data: e }))
    .onDismiss(e => resolve({ type: 'dismiss', data: e }))
})

dialogService.registerDialog(dialogTypes.ConfirmDialog, (opt, resolve) => {
  // ensure options
  const config = {
    title: opt.title || '确认',
    message: opt.message,
    ok: {
      label: opt.okLabel || '确定',
      color: opt.okColor || 'primary',
      flat: true
    },
    cancel: {
      label: opt.cancelLabel || '返回',
      color: opt.cancelColor || 'grey',
      flat: true
    },
    focus: opt.focus
  }

  Dialog.create(config)
    .onOk(e => resolve({ type: 'ok', data: e }))
    .onCancel(e => resolve({ type: 'cancel', data: e }))
    .onDismiss(e => resolve({ type: 'dismiss', data: e }))
})

export default dialogService
