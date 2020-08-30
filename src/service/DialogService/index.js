import { objectHasKey } from 'src/utils/object'
import { Dialog } from 'quasar'
import NewPostDialog from './components/NewPostDialog'
import * as DialogTypes from 'src/service/DialogService/dialog-types'

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
    return this._dialogs[name].dialog(opt)
  }
}
const dialogService = new DialogService()

dialogService.registerDialog(DialogTypes.NewPostDialog, () => {
  return new Promise(resolve => {
    Dialog.create({
      component: NewPostDialog
    })
      .onOk(e => resolve({ type: 'ok', data: e }))
      .onCancel(e => resolve({ type: 'cancel', data: e }))
      .onDismiss(e => resolve({ type: 'dismiss', data: e }))
  })
})

export default dialogService
