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
/**
 * @param {Number} value 时间戳
 */
export function getReadableStringFromNow (value) {
  const now = new Date()
  const units = ['seconds', 'minutes', 'hours', 'days', 'months', 'years'].reverse()
  const appends = ['秒', '分钟', '小时', '天', '个月', '年'].reverse()
  let number = null
  let append
  for (let idx = 0; idx <= units.length; idx++) {
    const diff = date.getDateDiff(now, value, units[idx])
    if (diff) {
      if (idx === units.indexOf('days') && diff >= 7) {
        number = Math.round(diff / 7)
        append = '周'
      } else {
        number = diff
        append = appends[idx]
      }
      return number + ' ' + append + '前'
    }
  }
}
