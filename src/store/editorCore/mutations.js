import * as mutationTypes from './mutation-types'
// post state

const mutations = {
  [mutationTypes.loadArticle] (state, post) {
    state.data.article = post
    mutations[mutationTypes.markSaved](state)
  },

  [mutationTypes.closeArticle] (state) {
    state.data.article = null
  },

  [mutationTypes.updateArticle] (state, post) {
    state.data.article = post
    mutations[mutationTypes.markChanged](state)
  },

  [mutationTypes.saveArticle] (state) {
    mutations[mutationTypes.markSaved](state)
  },

  // load

  [mutationTypes.loadArticles] (state, posts) {
    state.data.articles = posts
  },

  [mutationTypes.loadCategories] (state, categories) {
    state.data.categories = categories
  },

  [mutationTypes.loadTags] (state, tags) {
    state.data.tags = tags
  },

  // reset

  [mutationTypes.resetAll] (state) {
    mutations[mutationTypes.resetArticles](state)
    mutations[mutationTypes.resetCategories](state)
    mutations[mutationTypes.resetTags](state)
  },

  [mutationTypes.resetArticles] (state, posts) {
    state.data.articles = {}
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
