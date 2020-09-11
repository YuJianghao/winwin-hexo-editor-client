import * as mutationTypes from './mutation-types'
import * as byTypes from './by-types'

export default {
  namespaced: true,
  state: {
    by: 'all',
    id: null
  },
  mutations: {
    [mutationTypes.SET_FILTER]: (state, { by, id }) => {
      if (Object.keys(byTypes).includes(by)) {
        state.by = by
        if (byTypes.useId(by)) {
          if (!id) throw new Error('id is required!')
          state.id = id
        } else {
          state.id = null
        }
      } else {
        state.by = byTypes.ALL
        state.id = null
      }
    }
  }
}
