import * as mutationTypes from './mutation-types'
import * as byTypes from './by-types'

export default {
  namespaced: true,
  state: {
    by: byTypes.DATE,
    direction: false
  },
  mutations: {
    [mutationTypes.SET_SORTER]: (state, { by, direction }) => {
      state.by = by || byTypes.DATE
      state.direction = direction || false
    }
  }
}
