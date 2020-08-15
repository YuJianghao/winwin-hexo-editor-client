import * as mutationTypes from './mutation-types'
const mutations = {
  [mutationTypes.setFilterType]: (state, type) => {
    state.type = type
  },
  [mutationTypes.setFilterId]: (state, _id) => {
    state._id = _id
  },
  [mutationTypes.filterByAll]: (state) => {
    mutations[mutationTypes.setFilterType](state, 'all')
    mutations[mutationTypes.setFilterId](state, null)
  },
  [mutationTypes.filterByCategoriesId]: (state, _id) => {
    mutations[mutationTypes.setFilterType](state, 'categories')
    mutations[mutationTypes.setFilterId](state, _id)
  },
  [mutationTypes.filterByTagsId]: (state, _id) => {
    mutations[mutationTypes.setFilterType](state, 'tags')
    mutations[mutationTypes.setFilterId](state, _id)
  },
  [mutationTypes.filterByUnCategorized]: (state) => {
    mutations[mutationTypes.setFilterType](state, 'uncategorized')
    mutations[mutationTypes.setFilterId](state, null)
  }
}
export default mutations
