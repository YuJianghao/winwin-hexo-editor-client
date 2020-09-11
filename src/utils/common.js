import pinyin from 'pinyin'
export function objectToList (obj) {
  return Object.keys(obj).map(key => obj[key])
}

export function listToObject (list, key = '_id') {
  const obj = {}
  list.map(item => { obj[item[key]] = item })
  return obj
}

export function postCategoriesArray2d2Raw (categoriesArray2D) {
  let categories = []
  if (categoriesArray2D.length === 1) {
    if (categoriesArray2D[0].length === 1) {
      categories = categoriesArray2D[0][0]
    } else {
      categories = categoriesArray2D[0]
    }
  } else {
    categories = categoriesArray2D
  }
  return categories
}

export function postCategoriesRaw2Array2d (categories) {
  if (!categories) return [[]]
  if (!Array.isArray(categories)) return [[categories]]
  else {
    if (!categories.filter(cat => Array.isArray(cat)).length) { return [categories] }
    return categories.map(cat => {
      return Array.isArray(cat) ? cat : [cat]
    })
  }
}

export function stringSort (strA, strB) {
  const valueA = pinyin(strA, { style: pinyin.STYLE_NORMAL }).join('').toLowerCase()
  const valueB = pinyin(strB, { style: pinyin.STYLE_NORMAL }).join('').toLowerCase()
  return valueA > valueB ? 1 : -1
}
export function isOverflow (el) {
  return el.clientWidth < el.scrollWidth
}

export function objectHasKey (obj, key) {
  return Object.keys(obj).includes(key)
}

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
