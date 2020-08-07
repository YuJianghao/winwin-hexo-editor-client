import apis from 'src/api'
const hexo = apis.hexo

export async function getCategories () {
  const res = await hexo.getCategories()
  return res.data.categories
}
