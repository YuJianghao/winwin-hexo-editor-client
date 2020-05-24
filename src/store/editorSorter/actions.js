/*
export function someAction (context) {
}
*/
export function setKey ({ commit }, key) {
  if (!['date', 'title'].includes(key)) {
    throw new Error('unsupported key')
  }
  commit('setKey', key)
}

/**
 *
 * @param {Boolean} direction true为递增
 */
export function setDirection ({ commit }, direction) {
  commit('setDirection', direction)
}

export function toggleSortDirection ({ state, commit }) {
  commit('setDirection', !state.direction)
}
