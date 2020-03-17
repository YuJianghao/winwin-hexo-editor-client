import Vue from 'vue'
export function SET_POSTS (state, posts) {
  if (process.env.DEV)console.log('mutation SET_POSTS')
  if (!Array.isArray(posts)) {
    if (posts._id) {
      // set from single post
      state.posts = {}
      state.posts[posts._id] = posts
    } else {
      // set from posts object
      state.posts = posts
    }
  } else {
    // set from posts array
    const obj = {}
    posts.forEach(post => {
      obj[post._id] = post
    })
    state.posts = obj
  }
}

export function UPDATE_POSTS (state, posts) {
  if (process.env.DEV)console.log('mutation UPDATE_POSTS')
  if (!Array.isArray(posts)) {
    if (posts._id) {
      // update single post
      Vue.set(state.posts, posts._id, posts)
    } else {
      // update single posts object
      Object.keys(posts).forEach(_id => {
        Vue.set(state.posts, _id, posts[_id])
      })
    }
  } else {
    // update single posts array
    posts.forEach(post => {
      Vue.set(state.posts, post._id, post)
    })
  }
}

export function DELETE_POSTS (state, _ids) {
  if (process.env.DEV)console.log('mutation DELETE_POSTS')
  if (!Array.isArray(_ids)) {
    if (state.post && _ids === state.post._id) { state.post = null }
    Vue.delete(state.posts, _ids, undefined)
  } else {
    // update single posts array
    _ids.forEach(_id => {
      if (state.post && _id === state.post._id) { state.post = null }
      Vue.delete(state.posts, _id, undefined)
    })
  }
}

export function SET_POST (state, post) {
  if (process.env.DEV)console.log('mutation SET_POST')
  state.post = post
}

export function SET_POST_CATS (state, categories) {
  if (process.env.DEV)console.log('mutation SET_POST_CATS')
  Vue.set(state.post, 'categories', categories)
}

export function SET_POST_TAGS (state, tags) {
  if (process.env.DEV)console.log('mutation SET_POST_TAGS')
  state.post.tags = tags
}

export function SET_EDITING (state, editing) {
  if (process.env.DEV)console.log('mutation SET_EDITING')
  state.editing = editing
}

export function SET_FULL (state, full) {
  if (process.env.DEV)console.log('mutation SET_FULL')
  state.full = full
}

export function SET_CATEGORIES (state, categories) {
  if (process.env.DEV)console.log('mutation SET_CATEGORIES')
  Vue.set(state, 'categories', categories)
}

export function SET_TAGS (state, tags) {
  if (process.env.DEV)console.log('mutation SET_TAGS')
  Vue.set(state, 'tags', tags)
}

export function SELECT_CATEGORIES (state, categories) {
  if (process.env.DEV)console.log('mutation SELECT_CATEGORIES')
  if (!Array.isArray(categories)) {
    state.selectedCategories = [categories]
  } else {
    state.selectedCategories = categories
  }
  state.selectedTags = []
}

export function SELECT_TAGS (state, tags) {
  if (process.env.DEV)console.log('mutation SELECT_TAGS')
  if (!Array.isArray(tags)) {
    state.selectedTags = [tags]
  } else {
    state.selectedTags = tags
  }
  state.selectedCategories = []
}

export function SELECT_ALL (state) {
  if (process.env.DEV)console.log('mutation SELECT_ALL')
  state.selectedTags = []
  state.selectedCategories = []
}
