export function setFilter(state, { type, id }) {
  state.filter.type = type
  state.filter.id = id
}
export function setSort(state, { key, ascend }) {
  state.sort.key = key
  state.sort.ascend = ascend
}
