/**
 * @module HexoGetters
 */

export function filteredPosts (state) {
  const posts = Object.keys(state.posts).map(key => state.posts[key])
  if (!state.selectedTags.length && !state.selectedCategories.length) {
    return posts.filter(post => !post.isDiscarded).reverse()
  } else {
    const postTag = state.selectedTags.map(tag => tag.posts).reduce((p, c) => {
      return p.concat(c)
    }, [])
    const postCat = state.selectedCategories.map(cat => cat.posts).reduce((p, c) => {
      return p.concat(c)
    }, [])
    return posts.filter(post => postTag.concat(postCat).includes(post._id))
  }
}

export function postList (state) {
  return Object.keys(state.posts).map(key => state.posts[key])
}

export function unCategorizedPosts (state) {
  if (!state.categories) return []
  const cated = state.categories.map(cat => {
    return postList(state).filter(post => cat.posts.includes(post._id))
  }).reduce((a, b) => a.concat(b), [])
  return postList(state).filter(post => !cated.includes(post))
}
export function categoriesArray2d (state) {
  if (!state.post) return [[]]
  if (!state.post.categories) return [[]]
  const cats = state.post.categories
  if (!Array.isArray(cats)) return [[cats]]
  else {
    if (!cats.filter(cat => Array.isArray(cat)).length) { return [cats] }
    return cats.map(cat => {
      return Array.isArray(cat) ? cat : [cat]
    })
  }
}
