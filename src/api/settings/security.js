import { request } from '../request'

/**
 *
 * @param {Object} opt
 * @param {String} JWT_SECRET
 * @param {String} JW_EXPIRE
 * @param {String} JW_REFRESH
 * @param {String} APIKEY_SECRET
 */
async function setSecurity (opt = {}) {
  const { JWT_SECRET, JW_EXPIRE, JW_REFRESH, APIKEY_SECRET } = opt
  return request.put('/settings/security', { JWT_SECRET, JW_EXPIRE, JW_REFRESH, APIKEY_SECRET })
}
export default {
  setSecurity
}
