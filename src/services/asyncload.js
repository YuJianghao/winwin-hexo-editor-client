import Vue from 'vue'

const state = {}

/**
 * 异步载入，记录载入状态
 * @param {Promise} imp import('xxx')
 * @param {string} name 随便指定一个名称
 */
function load(imp, name) {
  if (!name) throw new Error('name is required')
  if (Object.keys(state).includes(name)) throw new Error('duplicate async load name:', name)
  Vue.set(state, name, {
    loading: true,
    error: false
  })
  const done = v => {
    state[name].loading = false
    return v
  }
  return () => imp.then(done, done).catch(e => {
    state[name].error = true
    return e
  })
}

export default {
  state, load
}
