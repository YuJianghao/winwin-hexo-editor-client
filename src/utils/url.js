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

export const replaceQuery = (str, target, value) => {
  if (str.indexOf('?') < 0) return str
  const strs = str.split('?')
  strs[strs.length - 1] = strs[strs.length - 1].split('&').map(item => {
    if (item.indexOf(target + '=') === 0) return target + '=' + value
    else return item
  }).join('&')
  return strs.join('?')
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
  return base + '?' + Object.keys(query).map(key => {
    return key + '=' + query[key]
  }).join('&')
}
