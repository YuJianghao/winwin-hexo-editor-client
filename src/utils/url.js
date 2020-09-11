
/**
 * Force reloading window regardless of "Confirm before reload" setting.
 * This is handy for certain cases, for example Last.fm connect/disconnect.
 */
export const forceReloadWindow = () => {
  if (window.__UNIT_TESTING__) {
    return
  }

  window.onbeforeunload = () => { }
  window.location.reload()
}

export function query2String (q) {
  return Object.keys(q).map(key => `${key}=${q[key]}`).join('&')
}

export function extendQuery (t, q, d = []) {
  let query = Object.assign({}, t)
  query = Object.assign(query, q)
  d.map(k => {
    delete query[k]
  })
  return query
}
