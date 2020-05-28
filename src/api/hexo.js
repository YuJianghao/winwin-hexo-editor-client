import { request } from './request'
const fullUrl = (url) => {
  return '/hexo' + url
}
const hexo = {
  getCategories: async () => {
    return request.get(fullUrl('/categories'))
  },
  getTags: async () => {
    return request.get(fullUrl('/tags'))
  },
  getPosts: async () => {
    return request.get(fullUrl('/posts'))
  },
  addPost: async (options) => {
    return request.post(fullUrl('/post'), options)
  },
  getPost: async (id) => {
    return request.get(fullUrl('/post/' + id))
  },
  updatePost: async (id, post) => {
    return request.put(fullUrl('/post/' + id), post)
  },
  deletePost: async (id) => {
    return request.delete(fullUrl('/post/' + id))
  },
  publishPost: async (id) => {
    return request.post(fullUrl('/post/' + id + '/publish'))
  },
  unpublishPost: async (id) => {
    return request.post(fullUrl('/post/' + id + '/unpublish'))
  },
  reload: async () => {
    return hexo._action('reload')
  },
  resetGit: async () => {
    return hexo._action('reset')
  },
  syncGit: async () => {
    return hexo._action('sync')
  },
  saveGit: async () => {
    return hexo._action('save')
  },
  deploy: async () => {
    return hexo._action('deploy')
  },
  clean: async () => {
    return hexo._action('clean')
  },
  _action: async (name) => {
    return request.post(fullUrl('/' + name))
  }
}
export default hexo
