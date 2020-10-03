import apis from 'src/api'
const hexo = apis.hexo

export class HexoServiceError extends Error {
  constructor (code, message) {
    super(message)
    this.code = code
    Error.captureStackTrace(this)
  }
}
HexoServiceError.HEXO_CANT_DEPLOY = 'HEXO_CANT_DEPLOY'

export class HexoService {
  static async publishPost (_id) {
    const res = await hexo.publishPost(_id)
    return res.data.post
  }

  static async unpublishPost (_id) {
    const res = await hexo.unpublishPost(_id)
    return res.data.post
  }

  static async syncGit () {
    const res = await hexo.syncGit()
    return res.data
  }

  static async saveGit () {
    const res = await hexo.saveGit()
    return res.data
  }

  static async deploy () {
    try {
      await hexo.deploy()
    } catch (err) {
      if (err.response && err.response.status === 503) {
        throw new HexoServiceError(HexoServiceError.HEXO_CANT_DEPLOY, '请配置`hexo deploy`命令')
      }
      throw err
    }
  }

  static async clean () {
    await hexo.clean()
  }

  static async generate () {
    await hexo.generate()
  }

  static async search (q, size) {
    const res = await hexo.search(q, size)
    return res.data
  }

  static async getRestrictedKeys () {
    const res = await hexo.getRestrictedKeys()
    return res.data.restrictedKeys
  }
}
