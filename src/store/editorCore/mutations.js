import * as mutationTypes from './mutation-types'
// post state

const mutations = {
  [mutationTypes.loadPost] (state, post) {
    state.data.post = post
    mutations[mutationTypes.markSaved](state)
  },

  [mutationTypes.closePost] (state) {
    state.data.post = null
  },

  [mutationTypes.updatePost] (state, post) {
    state.data.post = post
    mutations[mutationTypes.markChanged](state)
  },

  [mutationTypes.savePost] (state) {
    mutations[mutationTypes.markSaved](state)
  },

  // load

  [mutationTypes.loadPosts] (state, posts) {
    state.data.posts = posts
  },

  [mutationTypes.loadCategories] (state, categories) {
    state.data.categories = categories
  },

  [mutationTypes.loadTags] (state, tags) {
    state.data.tags = tags
  },

  // reset

  [mutationTypes.resetAll] (state) {
    mutations[mutationTypes.resetPosts](state)
    mutations[mutationTypes.resetCategories](state)
    mutations[mutationTypes.resetTags](state)
  },

  [mutationTypes.resetPosts] (state, posts) {
    state.data.posts = {}
  },

  [mutationTypes.resetCategories] (state, categories) {
    state.data.categories = {}
  },

  [mutationTypes.resetTags] (state, tags) {
    state.data.tags = {}
  },

  // change editor status

  [mutationTypes.markChanged] (state) {
    state.status.saved = false
  },

  [mutationTypes.markSaved] (state) {
    state.status.saved = true
  }
}
export default mutations
