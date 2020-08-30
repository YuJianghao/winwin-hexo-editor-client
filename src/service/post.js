import apis from 'src/api'
const hexo = apis.hexo

export async function getArticleList () {
  const res = await hexo.getPosts()
  return res.data.posts
}
export async function getArticleById (_id, isPage = false) {
  const res = isPage ? await hexo.getPage(_id) : await hexo.getPost(_id)
  return res.data.post
}
export async function deleteArticleById (_id) {
  await hexo.deletePost(_id)
}
export async function addArticle (options, isPage = false) {
  const res = isPage ? await hexo.addPage(options) : await hexo.addPost(options)
  return res.data.post
}
export async function saveArticle (post, isPage = false) {
  const res = isPage ? await hexo.updatePage(post._id, post) : await hexo.updatePost(post._id, post)
  return res.data.post
}
