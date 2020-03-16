import { Notify } from 'quasar'
export default {
  info (opt) {
    Notify.create(Object.assign({ ...opt }, {
      color: 'primary',
      icon: 'mail',
      timeout: 2000
    }))
  },
  warning (opt) {
    Notify.create(Object.assign({ ...opt }, {
      color: 'primary',
      icon: 'warning',
      timeout: 2000
    }))
  },
  success (opt) {
    Notify.create(Object.assign({ ...opt }, {
      color: 'primary',
      icon: 'done'
    }))
  },
  error (opt) {
    Notify.create(Object.assign({ ...opt }, {
      color: 'red',
      icon: 'error',
      timeout: 2000
    }))
  }
}
