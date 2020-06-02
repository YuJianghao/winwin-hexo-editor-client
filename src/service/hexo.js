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

export async function publishPost (_id) {
  const res = await hexo.publishPost(_id)
  return res.data.post
}
export async function unpublishPost (_id) {
  const res = await hexo.unpublishPost(_id)
  return res.data.post
}

export async function syncGit () {
  await hexo.syncGit()
}

export async function saveGit () {
  await hexo.saveGit()
}

export async function deploy () {
  await hexo.deploy()
}

export async function clean () {
  await hexo.clean()
}

export async function search (q, size) {
  const res = await hexo.search(q, size)
  return res.data
}
