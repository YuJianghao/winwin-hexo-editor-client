import * as hexoService from 'src/service/hexo'
import { Logger } from 'src/utils/logger'

const logger = new Logger({ prefix: 'editorSearch/Actions' })
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
  const res = await hexoService.search(q, size)
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
