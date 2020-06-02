/*
export function someGetter (state) {
}
*/
export function resultByPost (state) {
  const groups = {}
  state.result.forEach(item => {
    const group = item._id
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  const groupsList = Object.keys(groups).map(key => {
    return {
      _id: key,
      result: groups[key]
    }
  })
  return groupsList
}
