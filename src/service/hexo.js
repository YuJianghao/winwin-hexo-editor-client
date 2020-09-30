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

export async function publishPost (_id) {
  const res = await hexo.publishPost(_id)
  return res.data.post
}
export async function unpublishPost (_id) {
  const res = await hexo.unpublishPost(_id)
  return res.data.post
}

export async function syncGit () {
  const res = await hexo.syncGit()
  return res.data
}

export async function saveGit () {
  const res = await hexo.saveGit()
  return res.data
}

export async function deploy () {
  try {
    await hexo.deploy()
  } catch (err) {
    if (err.response && err.response.status === 503) {
      throw new HexoServiceError(HexoServiceError.HEXO_CANT_DEPLOY, '请配置`hexo deploy`命令')
    }
    throw err
  }
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
