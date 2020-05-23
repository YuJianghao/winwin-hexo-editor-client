import apis from 'src/api'
const hexo = apis.hexo

export async function getPosts () {
  const res = await hexo.getPosts()
  return res.data.posts
}
export async function getCategories () {
  const res = await hexo.getCategories()
  return res.data.categories
}

export async function getTags () {
  const res = await hexo.getTags()
  return res.data.tags
}
export async function getPostById (_id) {
  const res = await hexo.getPost(_id)
  return res.data.post
}
export async function deletePostById (_id) {
  await hexo.deletePost(_id)
}
export async function addPost (options) {
  const res = await hexo.addPost(options)
  return res.data.post
}
export async function savePost (post) {
  const res = await hexo.updatePost(post._id, post)
  return res.data.post
}
