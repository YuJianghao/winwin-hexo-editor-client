import apis from 'src/api'
const hexo = apis.hexo

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

export async function generate () {
  await hexo.generate()
}

export async function search (q, size) {
  const res = await hexo.search(q, size)
  return res.data
}

export async function getRestrictedKeys () {
  const res = await hexo.getRestrictedKeys()
  return res.data.restrictedKeys
}
