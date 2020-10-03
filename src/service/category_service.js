import apis from 'src/api'
const hexo = apis.hexo

export class CategoryService {
  static async getCategories () {
    const res = await hexo.getCategories()
    return res.data.categories
  }
}
