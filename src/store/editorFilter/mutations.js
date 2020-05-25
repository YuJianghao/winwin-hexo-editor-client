/*
export function someMutation (state) {
}
*/
export function setFilterType (state, type) {
  state.type = type
}
export function setFilterId (state, _id) {
  state._id = _id
}
export function filterByAll (state) {
  setFilterType(state, 'all')
  setFilterId(state, null)
}
export function filterByCategoriesId (state, _id) {
  setFilterType(state, 'categories')
  setFilterId(state, _id)
}
export function filterByTagsId (state, _id) {
  setFilterType(state, 'tags')
  setFilterId(state, _id)
}
export function filterByUnCategorized (state) {
  setFilterType(state, 'uncategorized')
  setFilterId(state, null)
}
