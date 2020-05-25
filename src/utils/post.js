import { date } from 'quasar'

/**
 * @param {Number} value 时间戳
 */
export function getDatetimeStringDefault (value) {
  return date.formatDate(value, 'YYYY年MM月DD日 HH:mm:ss')
}
/**
 * @param {Number} value 时间戳
 */
export function getDatetimeStringNoSec (value) {
  return date.formatDate(value, 'YYYY年MM月DD日 HH:mm')
}
/**
 * @param {Number} value 时间戳
 */
export function getDateStringDefault (value) {
  return date.formatDate(value, 'YYYY年MM月DD日')
}
/**
 * @param {Number} value 时间戳
 */
export function getTimeStringDefault (value) {
  return date.formatDate(value, 'HH:mm')
}
