import { axios } from 'axios'
export default {
  listPosts: async () => {
    return axios.get('/posts')
  },
  listPages: async () => {
    return axios.get('/pages')
  },
  listTags: async () => {
    return axios.get('/tags')
  },
  listCategories: async () => {
    return axios.get('/categories')
  },
  newPostOrPage: async (title, opt = {}) => {
    const { layout, path, slug, replace } = opt
    const data = { title }
    new Array([layout, path, slug, replace]).map(key => {
      if (key !== undefined) { data[key] = key }
    })
    return axios.post('/new', data)
  },
  updatePostOrPage: async (id, page, obj) => {
    return axios.post('/update', { id, page, obj })
  },
  deletePostOrPage: async (id, page) => {
    return axios.post('/delete', { id, page })
  },
}
