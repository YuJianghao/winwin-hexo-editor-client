export function objectHasKey (obj, key) {
  return Object.keys(obj).includes(key)
}

export function objectForEach (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key]))
}
