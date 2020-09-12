import { objectHasKey } from 'src/utils/common'
import { Dialog } from 'quasar'
import NewPostDialog from './components/NewPostDialog'
class DialogType {}
DialogType.NewPostDialog = 'NewPostDialog'
DialogType.ConfirmDialog = 'ConfirmDialog'

class DialogService {
  static dialogs={}

  static registerDialog (name, dialog) {
    if (objectHasKey(DialogService.dialogs, name)) {
      throw new Error('duplicate name')
    }
    DialogService.dialogs[name] = { name, dialog }
  }

  /**
   *
   * @param {DialogType} name 名称
   * @param {Object} opt 配置
   * @param {String} [opt.title] 标题
   * @param {String} [opt.message] 信息
   * @param {String} [opt.okLabel] 确认按钮标签
   * @param {String} [opt.okColor] 确认按钮颜色
   * @param {String} [opt.cancelLabel] 返回按钮标签
   * @param {String} [opt.cancelColor] 返回按钮颜色
   * @param {Boolean} [opt.focus] 是否聚焦
   */
  static async create (name, opt) {
    return new Promise((resolve, reject) => {
      return DialogService.dialogs[name].dialog(opt, resolve, reject)
    })
  }
}

DialogService.registerDialog(DialogType.NewPostDialog, (opt, resolve) => {
  Dialog.create({
    component: NewPostDialog
  })
    .onOk(e => resolve({ type: 'ok', data: e }))
    .onCancel(e => resolve({ type: 'cancel', data: e }))
    .onDismiss(e => resolve({ type: 'dismiss', data: e }))
})

DialogService.registerDialog(DialogType.ConfirmDialog, (opt, resolve) => {
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

export { DialogService, DialogType }
