import { request } from './request'
export default {
  listPosts: async () => {
    return request.get('/posts')
  },
  listPages: async () => {
    return request.get('/pages')
  },
  listTags: async () => {
    return request.get('/tags')
  },
  listCategories: async () => {
    return request.get('/categories')
  },
  newPostOrPage: async (title, opt = {}) => {
    const { layout, path, slug, replace } = opt
    const data = { title }
    new Array([layout, path, slug, replace]).map(key => {
      if (key !== undefined) { data[key] = key }
    })
    return request.post('/new', data)
  },
  updatePostOrPage: async (id, page, obj) => {
    return request.post('/update', { id, page, obj })
  },
  deletePostOrPage: async (id, page) => {
    return request.post('/delete', { id, page })
  },
}
