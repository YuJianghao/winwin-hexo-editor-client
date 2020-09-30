import apis from 'src/api'
const hexo = apis.hexo

export class TagService {
  static async getTags () {
    const res = await hexo.getTags()
    return res.data.tags
  }
}
