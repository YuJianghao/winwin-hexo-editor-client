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
  newPostOrPage: async (opt) => {
    return request.post('/new', opt)
  },
  updatePostOrPage: async (id, page, obj) => {
    return request.post('/update', { id, page, obj })
  },
  deletePostOrPage: async (id, page) => {
    return request.post('/delete', { id, page })
  },
  publishPost: async (id) => {
    return request.post('/publish', { id })
  },
}
