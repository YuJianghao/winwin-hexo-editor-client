import axios from 'axios'
export default {
  listPosts: async () => {
    return axios.get('/api/posts')
  },
  listPages: async () => {
    return axios.get('/api/pages')
  },
  listTags: async () => {
    return axios.get('/api/tags')
  },
  listCategories: async () => {
    return axios.get('/api/categories')
  },
  newPostOrPage: async (title, opt = {}) => {
    const { layout, path, slug, replace } = opt
    const data = { title }
    new Array([layout, path, slug, replace]).map(key => {
      if (key !== undefined) { data[key] = key }
    })
    return axios.post('/api/new', data)
  },
  updatePostOrPage: async (id, page, obj) => {
    return axios.post('/api/update', { id, page, obj })
  },
  deletePostOrPage: async (id, page) => {
    return axios.post('/api/delete', { id, page })
  },
}
