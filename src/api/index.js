import hexo from './hexo'
import users from './users'
import info from './info'
import settings from './settings'
import install from './install'
import { request } from './request'

const apis = {
  hexo: hexo({
    baseUrl: process.env.HEXO_SERVER_BASE,
    axios: request
  }),
  users,
  info,
  settings,
  install
}

export default apis
