/**
 * SDK for @winwin/hexo-editor-server
 * @module hexo-editor-sdk
 * @author winwin2011
 */
const debug = require('debug')('hexo-editor-server/sdk')

/**
 * export hexo-editor-server/sdk
 * @param {Object} opts - options
 * @param {String} opts.baseUrl - baseUrl to access hexo-editor-server
 * @param {Axios} opts.axios - axios instance
 * @returns {Object} - sdk object
 */
function factory (opts) {
  if (!opts.axios) throw new Error('opts.axios instance is required')
  if (!opts.baseUrl) throw new Error('opts.baseUrl is required')

  // format /baseUrl/ to /baseUrl
  if (opts.baseUrl.slice(-1) === '/')opts.baseUrl = opts.baseUrl.slice(0, -1)
  debug('baseurl', opts.baseUrl)

  // helper functions
  function fullUrl (route) {
    return opts.baseUrl + route
  }

  // setup opts.axios
  const request = opts.axios

  // sdk
  const hexo = {
    hello: async () => {
      return request.get(fullUrl('/'))
    },
    getCategories: async () => {
      return request.get(fullUrl('/categories'))
    },
    getTags: async () => {
      return request.get(fullUrl('/tags'))
    },
    getPosts: async () => {
      return request.get(fullUrl('/posts'))
    },
    addPost: async (options) => {
      return request.post(fullUrl('/post'), options)
    },
    addPage: async (options) => {
      return request.post(fullUrl('/page'), options)
    },
    getPost: async (id) => {
      if (!id) throw new Error('id(post id) is required')
      return request.get(fullUrl('/post/' + id))
    },
    getPage: async (id) => {
      if (!id) throw new Error('id(post id) is required')
      return request.get(fullUrl('/page/' + id))
    },
    updatePost: async (id, post) => {
      if (!id) throw new Error('id(post id) is required')
      return request.put(fullUrl('/post/' + id), post)
    },
    updatePage: async (id, post) => {
      if (!id) throw new Error('id(post id) is required')
      return request.put(fullUrl('/page/' + id), post)
    },
    deletePost: async (id) => {
      if (!id) throw new Error('id(post id) is required')
      return request.delete(fullUrl('/post/' + id))
    },
    deletePage: async (id) => {
      if (!id) throw new Error('id(post id) is required')
      return request.delete(fullUrl('/page/' + id))
    },
    publishPost: async (id) => {
      if (!id) throw new Error('id(post id) is required')
      return request.post(fullUrl('/post/' + id + '/publish'))
    },
    unpublishPost: async (id) => {
      if (!id) throw new Error('id(post id) is required')
      return request.post(fullUrl('/post/' + id + '/unpublish'))
    },
    reload: async () => {
      return hexo._action('reload')
    },
    resetGit: async () => {
      return hexo._action('reset')
    },
    syncGit: async () => {
      return hexo._action('sync')
    },
    saveGit: async () => {
      return hexo._action('save')
    },
    deploy: async () => {
      return hexo._action('deploy')
    },
    clean: async () => {
      return hexo._action('clean')
    },
    generate: async () => {
      return hexo._action('generate')
    },
    search: async (q, size) => {
      if (size) {
        return request.get(fullUrl(`/search?q=${q}&size=${size}`))
      } else {
        return request.get(fullUrl(`/search?q=${q}`))
      }
    },
    _action: async (name) => {
      return request.post(fullUrl('/' + name))
    }
  }
  return hexo
}

export default factory
