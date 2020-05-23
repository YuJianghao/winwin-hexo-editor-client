import { Notify } from 'quasar'
export default {
  /**
   *
   * @param {object} opt 参数
   * @param {string} message 消息内容
   * @param {string} position 消息位置
   */
  info (opt) {
    Notify.create(Object.assign({ ...opt }, {
      color: 'primary',
      icon: 'mail',
      timeout: 2000
    }))
  },
  /**
   *
   * @param {object} opt 参数
   * @param {string} message 消息内容
   * @param {string} position 消息位置
   */
  warning (opt) {
    Notify.create(Object.assign({ ...opt }, {
      color: 'primary',
      icon: 'warning',
      timeout: 2000
    }))
  },
  /**
   *
   * @param {object} opt 参数
   * @param {string} message 消息内容
   * @param {string} position 消息位置
   */
  success (opt) {
    Notify.create(Object.assign({ ...opt }, {
      color: 'primary',
      icon: 'done'
    }))
  },
  /**
   *
   * @param {object} opt 参数
   * @param {string} message 消息内容
   * @param {string} position 消息位置
   */
  error (opt) {
    Notify.create(Object.assign({ ...opt }, {
      color: 'red',
      icon: 'error',
      timeout: 2000
    }))
  }
}
