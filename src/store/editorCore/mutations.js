// post state

export function loadPost (state, post) {
  state.data.post = post
  markSaved(state)
}

export function closePost (state) {
  state.data.post = null
}

export function updatePost (state, post) {
  state.data.post = post
  markChanged(state)
}

export function savePost (state) {
  markSaved(state)
}

// load

export function loadPosts (state, posts) {
  state.data.posts = posts
}

export function loadCategories (state, categories) {
  state.data.categories = categories
}

export function loadTags (state, tags) {
  state.data.tags = tags
}

// reset

export function resetAll (state) {
  resetPosts(state)
  resetCategories(state)
  resetTags(state)
}

export function resetPosts (state, posts) {
  state.data.posts = {}
}

export function resetCategories (state, categories) {
  state.data.categories = {}
}

export function resetTags (state, tags) {
  state.data.tags = {}
}

// change editor status

export function markChanged (state) {
  state.status.saved = false
}

export function markSaved (state) {
  state.status.saved = true
}
