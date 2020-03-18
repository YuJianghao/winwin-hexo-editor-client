import hexo from '@winwin/hexo-editor-sdk'
import users from './users'
import request from './request'

const apis = {
  hexo: hexo({
    baseUrl: process.env.HEXO_SERVER_BASE,
    axios: request
  }),
  users
}

export default apis
