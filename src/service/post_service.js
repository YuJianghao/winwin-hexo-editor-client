import apis from 'src/api'
const hexo = apis.hexo
export class PostService {
  static async getArticleList () {
    const res = await hexo.getPosts()
    return res.data.posts
  }

  static async getArticleById (_id, isPage = false) {
    const res = isPage ? await hexo.getPage(_id) : await hexo.getPost(_id)
    return res.data.post
  }

  static async deleteArticleById (_id, isPage = false) {
    isPage ? await hexo.deletePage(_id) : await hexo.deletePost(_id)
  }

  static async addArticle (options, isPage = false) {
    const res = isPage ? await hexo.addPage(options) : await hexo.addPost(options)
    return res.data.post
  }

  static async saveArticle (post, isPage = false) {
    const res = isPage ? await hexo.updatePage(post._id, post) : await hexo.updatePost(post._id, post)
    return res.data.post
  }
}
