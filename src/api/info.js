import { request } from './request'
export default {
  version: async () => {
    return request.get('/version')
  }
}
