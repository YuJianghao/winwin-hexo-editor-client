import hexo from '@winwin/hexo-editor-sdk'
import request from './request'

const apis = {
  hexo: hexo({
    baseUrl: process.env.HEXO_SERVER_BASE,
    axios: request
  })
}

export default apis
