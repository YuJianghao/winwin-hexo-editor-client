import hexo from './hexo'
import users from './users'
import info from './info'
import settings from './settings'
import { request } from './request'

const apis = {
  hexo: hexo({
    baseUrl: process.env.HEXO_SERVER_BASE,
    axios: request
  }),
  users,
  info,
  settings
}

export default apis
