import api from '../api'
export default {
  listPosts: async () => {
    const res = await api.hexo.listPosts()
    return res.data
  },
  listPages: async () => {
    const res = await api.hexo.listPages()
    return res.data
  },
  listTags: async () => {
    const res = await api.hexo.listTags()
    return res.data
  },
  listCategories: async () => {
    const res = await api.hexo.listCategories()
    return res.data
  },
  newPostOrPage: async (title, opt = {}) => {
    const res = await api.hexo.newPostOrPage(title, opt)
    return res.data
  },
  /**
   * @param {String} id
   * @param {Boolean} page 是否是页面
   * @param {Object} obj 文章完整对象
   */
  updatePostOrPage: async (id, page, obj) => {
    const res = await api.hexo.updatePostOrPage(id, page, obj)
    return res.data
  },
  /**
   * @param {String} id
   * @param {Boolean} page 是否是页面
   */
  deletePostOrPage: async (id, page) => {
    const res = await api.hexo.deletePostOrPage(id, page)
    return res.data
  },
}