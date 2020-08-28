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

export const redirect = url => {
  window.location.href = url
}

export const replaceQuery = (str = '', q = {}, d = []) => {
  const del = typeof d === 'string' ? [d] : d
  let{ base, query } = getBaseAndQueryFromHref(str)
  query = extendQuery(query, q, del)
  return getHrefFromBaseAndQuery(base, query)
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

export const getBaseAndQueryFromHref = href => {
  if (href.indexOf('?') < 0) {
    return {
      base: href,
      query: {}
    }
  }
  const all = href.split('?')
  const base = all.slice(0, all.length - 1).join('')
  const queryString = all[all.length - 1]
  const query = queryString.split('&').map(item => {
    const tmp = item.split('=')
    return { [tmp[0]]: tmp[1] }
  }).reduce((a, b) => {
    return Object.assign(a, b)
  })
  return { base, query }
}

export const getHrefFromBaseAndQuery = (base, query) => {
  return base + '?' + query2String(query)
}
