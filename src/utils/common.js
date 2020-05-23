export function objectToList (obj) {
  return Object.keys(obj).map(key => obj[key])
}

export function listToObject (list, key = '_id') {
  const obj = {}
  list.map(item => { obj[item[key]] = item })
  return obj
}

export function postCategoriesArray2d (categories) {
  if (!categories) return [[]]
  if (!Array.isArray(categories)) return [[categories]]
  else {
    if (!categories.filter(cat => Array.isArray(cat)).length) { return [categories] }
    return categories.map(cat => {
      return Array.isArray(cat) ? cat : [cat]
    })
  }
}
