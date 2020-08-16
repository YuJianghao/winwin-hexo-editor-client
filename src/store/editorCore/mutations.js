import * as mutationTypes from './mutation-types'

// article state

const mutations = {
  [mutationTypes.loadArticle] (state, article) {
    state.data.article = article
    mutations[mutationTypes.setLastSavedAt](state, null)
    mutations[mutationTypes.markSaved](state)
  },

  [mutationTypes.closeArticle] (state) {
    state.data.article = null
    mutations[mutationTypes.setLastSavedAt](state, null)
  },

  [mutationTypes.updateArticle] (state, article) {
    state.data.article = article
    mutations[mutationTypes.markChanged](state)
  },

  [mutationTypes.saveArticle] (state) {
    mutations[mutationTypes.markSaved](state)
    mutations[mutationTypes.setLastSavedAt](state, new Date())
  },

  // load

  [mutationTypes.loadArticles] (state, articles) {
    state.data.articles = articles
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

  [mutationTypes.resetArticles] (state, articles) {
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
  },

  [mutationTypes.setLastSavedAt] (state, time) {
    state.status.lastSavedAt = time
  }
}
export default mutations
