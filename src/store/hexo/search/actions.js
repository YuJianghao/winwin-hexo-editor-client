import { HexoService } from 'src/service/hexo_service'

import { Logger } from 'src/utils/logger'

const logger = new Logger({ prefix: 'hexoSearch/Actions' })
/*
export function someAction (context) {
}
*/
export async function search ({ state, commit, dispatch }, payload = {}) {
  const q = payload.q || null
  if (!q) {
    logger.log('empty query')
    await dispatch('clear')
    return {}
  }
  const size = payload.size || state.size
  const res = await HexoService.search(q, size)
  commit('setQ', res.q)
  commit('setResult', res.result)
  commit('setSize', res.size)
}

export async function init ({ dispatch }) {
  await dispatch('clear')
}

export async function clear ({ commit }) {
  commit('setQ', null)
  commit('setResult', [])
  commit('setSize', 15)
}
