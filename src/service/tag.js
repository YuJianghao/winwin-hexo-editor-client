import apis from 'src/api'
const hexo = apis.hexo

export async function getTags () {
  const res = await hexo.getTags()
  return res.data.tags
}
