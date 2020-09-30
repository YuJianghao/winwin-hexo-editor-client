import { request } from './request'
export default {
  version: async () => {
    return request.get('/info/version')
  },
  apidocUrl: (process.env.DEV ? '/api' : '') + '/info/apidoc'
}
