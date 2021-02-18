import { origin } from "./request"

export default {
  check: async () => {
    return origin.get('/install/')
  },
  install: async (opt) => {
    if (!opt.root) throw new Error('opt.root is required')
    if (!opt.ecret) throw new Error('opt.ecret is required')
    if (!opt.expire) throw new Error('opt.expire is required')
    if (!opt.refresh) throw new Error('opt.refresh is required')
    if (!opt.username) throw new Error('opt.username is required')
    if (!opt.password) throw new Error('opt.password is required')
    return origin.post('/install/', opt)
  },
  checkroot: async (opt) => {
    if (!opt.root) throw new Error('opt.root is required')
    return origin.post('/install/checkroot', opt)
  }
}
