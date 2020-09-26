import { request } from '../request'
export default {
  getUiConfig: async () => {
    const res = await request.get('/settings/ui')
    return res.config.ui
  },
  setUiConfig: async (config) => {
    return request.put('/settings/ui', config)
  }
}
