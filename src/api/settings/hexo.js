import { request } from '../request'
export default {
  getHexoRoot: async () => {
    const res = await request.get('/settings/hexo')
    return res.data.HEXO_ROOT
  },
  setHexoRoot: async (HEXO_ROOT) => {
    return request.put('/settings/hexo', { HEXO_ROOT })
  }
}
