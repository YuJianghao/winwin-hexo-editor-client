import { Logger } from 'src/utils/logger'
import Vue from 'vue'
const logger = new Logger({ prefix: 'async load' })
const state = {}

/**
 * 异步载入，记录载入状态
 * @param {Promise} imp import('xxx')
 * @param {string} name 随便指定一个名称
 */
function load(fn, name, meta = {}, delay = 200) {
  if (!name) throw new Error('name is required')
  if (Object.keys(state).includes(name)) throw new Error('duplicate async load name:', name)
  logger.log('registed:', name)
  Vue.set(state, name, {
    loading: false,
    error: false,
    meta
  })
  return () => {
    const token = window.setTimeout(() => {
      state[name].loading = true
      logger.log('start loading:', name)
    }, delay)
    const done = v => {
      if (token) window.clearTimeout(token)
      state[name].loading = false
      logger.log('end loading:', name)
      return v
    }
    return fn().then(done, done).catch(e => {
      state[name].error = true
      logger.log('fail loading:', name)
      return e
    })
  }
}

export default {
  state, load
}
