import { EventEmitter } from 'events'
import random from 'string-random'
import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'EditorStore' })
// import Vue from 'vue'

class Helper {
  static objectToList (obj) {
    return Object.keys(obj).map(key => obj[key])
  }

  static listToObject (list, key = '_id') {
    const obj = {}
    list.map(item => { obj[item[key]] = item })
    return obj
  }

  static postCategoriesArray2d (categories) {
    if (!categories) return [[]]
    if (!Array.isArray(categories)) return [[categories]]
    else {
      if (!categories.filter(cat => Array.isArray(cat)).length) { return [categories] }
      return categories.map(cat => {
        return Array.isArray(cat) ? cat : [cat]
      })
    }
  }
}

class HexoEditorCore extends EventEmitter {
  constructor () {
    super()
    const ctx = this
    this.state = {
      saved: true,
      changed: false,
      ready: false,
      posts: {},
      get empty () {
        return this.postsCount === 0
      },
      get postsCount () {
        return this.postsList.length
      },
      get uncategorizedPostsCount () {
        return this.postsList.filter(post => !post.categories).length
      },
      categories: {},
      tags: {},
      post: null,
      get postsList () {
        return Helper.objectToList(this.posts)
      },
      get categoriesList () {
        return Helper.objectToList(this.categories)
      },
      get tagsList () {
        return Helper.objectToList(this.tags)
      },
      get categoriesNameList () {
        return this.categoriesList.map(item => item.name)
      },
      get tagsNameList () {
        return this.tagsList.map(item => item.name)
      },
      get filteredPostsList () {
        try {
          if (this.filterBy.type === 'all') return this.postsList
          if (this.filterBy.type === 'categories') return this.categories[this.filterBy._id].posts.map(_id => this.posts[_id])
          if (this.filterBy.type === 'tags') return this.tags[this.filterBy._id].posts.map(_id => this.posts[_id])
          if (this.filterBy.type === 'uncategorized') return this.postsList.filter(post => !post.categories)
          throw new Error('invalid')
        } catch (__) {
          if (ctx.debug) logger.warn(`invalid type ${this.filterBy.type} with _id ${this.filterBy._id}, returning postsList`)
          this.filterBy.type = 'all'
          return this.filteredPostsList
        }
        // TODO
      },
      filterBy: {
        type: 'all',
        _id: null
      },
      get postTags () {
        if (!this.post) return null
        return this.post.tags
      },
      get postCategories () {
        if (!this.post) return null
        return this.post.categories
      },
      get postCategoriesList () {
        return this.postCategoriesArray2d[0]
      },
      get postCategoriesArray2d () {
        if (!this.post) return [[null]]
        if (!this.post.categories) return [[]]
        return Helper.postCategoriesArray2d(this.post.categories)
      }
    }
  }

  /**
   * 初始化客户端数据
   * @param {Object} opts 初始化选项
   * @param {Object} opts.api hexo-client-sdk-api实例
   * @param {Boolean} [opts.debug=false]
   */
  async init (opts) {
    if (!opts.api) throw new Error('hexo-editor-sdk-api is required')
    this.api = opts.api
    this.debug = opts.debug || false

    await this.loadPosts()
    await this.loadCategories()
    await this.loadTags()
    await this._markReset()
    this.state.ready = true
    this._start('ready')
    // await new Promise(resolve => {
    //   window.setTimeout(async () => {
    //     resolve()
    //   }, 5000)
    // })
  }

  async reload (force = false) {
    await this.loadPosts()
    await this.loadCategories()
    await this.loadTags()
  }

  /**
   * 载入文章列表
   */
  async loadPosts () {
    this._start('load-posts-start')
    try {
      const res = await this.api.getPosts()
      await this._setPosts(res.data.posts)
      this._success('load-posts-success')
    } catch (err) {
      this._fail('load-posts-fail', err)
    } finally {
      this._info('load-posts-end')
    }
  }

  /**
   * 载入分类列表
   */
  async loadCategories () {
    this._start('load-categories-start')
    try {
      const res = await this.api.getCategories()
      await this._setCategories(res.data.categories)
      this._success('load-categories-success')
    } catch (err) {
      this._fail('load-categories-fail', err)
    } finally {
      this._info('load-categories-end')
    }
  }

  /**
   * 载入标签列表
   */
  async loadTags () {
    this._start('load-tags-start')
    try {
      const res = await this.api.getTags()
      await this._setTags(res.data.tags)
      this._success('load-tags-success')
    } catch (err) {
      this._fail('load-tags-fail', err)
    } finally {
      this._info('load-tags-end')
    }
  }

  /**
   * 更新文章列表
   * @param {Object[]} posts 文章列表
   */
  async _setPosts (posts) {
    this.state.posts = Helper.listToObject(posts)
    this._update('posts-update', this.state.posts)
  }

  /**
   * 更新分类列表
   * @param {Any}} categories 分类
   */
  async _setCategories (categories) {
    this.state.categories = Helper.listToObject(categories)
    this._update('categories-update', this.state.categories)
  }

  /**
   * 更新标签列表
   * @param {Object[]} tags 标签列表
   */
  async _setTags (tags) {
    this.state.tags = Helper.listToObject(tags)
    this._update('tags-update', this.state.tags)
  }

  /**
   * 选择所有文章
   */
  async filterByAll () {
    this.state.filterBy.type = 'all'
  }

  /**
   * 根据分类筛选文章
   * @param {String} _id 分类id
   */
  async filterByCategoriesId (_id) {
    if (!this.state.categories[_id]) {
      if (this.debug) logger.warn(`categories ${_id} not exists, returning`)
      return
    }
    this.state.filterBy.type = 'categories'
    this.state.filterBy._id = _id
  }

  /**
   * 选择未分类文章
   */
  async filterByUnCategorized () {
    this.state.filterBy.type = 'uncategorized'
  }

  /**
   * 根据标签筛选文章
   * @param {String} _id 标签id
   */
  async filterByTagsId (_id) {
    if (!this.state.tags[_id]) {
      if (this.debug) logger.warn(`tags ${_id} not exists, returning`)
      return
    }
    this.state.filterBy.type = 'tags'
    this.state.filterBy._id = _id
  }

  async destory () {
    this.state.posts = {}
    this.state.categories = {}
    this.state.tags = {}
    this.state.post = null
  }

  async _markChanged () {
    this._update('markChanged')
    this.state.changed = true
    this.state.saved = false
  }

  async _markReset () {
    this._info('markReset')
    this.state.changed = false
    this.state.saved = true
  }

  async _markSaved () {
    this._success('markSaved')
    this.state.saved = true
  }

  async _setPost (post) {
    this.state.post = post
    this._update('post-update', this.state.post)
  }

  async savePost () {
    if (!this.state.post || this.state.saved) return
    this._success('save-post-start')
    try {
      const res = await this.api.updatePost(this.state.post._id, this.state.post)
      await this._setPost(res.data.post)
      await this._markSaved()
      this._success('save-post-success', this.state.post)
      await this.reload()
    } catch (err) {
      this._fail('save-post-fail', err)
    } finally {
      this._info('save-post-end')
    }
  }

  async setPostByPost (post) {
    if (!post) throw new Error('post is required')
    this._update('set-post-post')
    await this._markChanged()
    await this._setPost(post)
  }

  async setPostByCategories (categories) {
    if (!categories) throw new Error('categories is required')
    this._update('set-post-categories')
    await this._markChanged()
    await this._setPost({ ...this.state.post, ...{ categories } })
  }

  async setPostByCategoriesArray2d (categories) {
    if (!categories) throw new Error('categories is required')
    if (categories.length === 1) {
      if (categories[0].length === 1) {
        await this.setPostByCategories(categories[0][0])
      } else {
        await this.setPostByCategories(categories[0])
      }
    } else {
      await this.setPostByCategories(categories)
    }
  }

  async setPostByTitle (title = '新文章') {
    if (!title && this.debug) logger.warn('no title given, using default')
    this._update('set-post-title')
    await this._markChanged()
    await this._setPost({ ...this.state.post, ...{ title } })
  }

  async setPostByContent (_content) {
    if (!_content && this.debug) logger.warn('no _content given, using default:`\\n`')
    this._update('set-post-_content')
    await this._markChanged()
    await this._setPost({ ...this.state.post, ...{ _content: _content || '\n' } })
  }

  async setPostByTags (tags) {
    if (!tags) throw new Error('tags is required')
    this._update('set-post-tags')
    await this._markChanged()
    await this._setPost({ ...this.state.post, ...{ tags } })
  }

  async addPostByDefault () {
    await this.addPostByTitle('新文章')
  }

  async addPostByTitle (title) {
    await this.addPostByOptions({ title })
  }

  async addPostByOptions (options, force) {
    if (!force && !this.state.saved) throw new Error('Unsaved file, use force=true to override')
    if (!options.title) throw new Error('options.title is required')
    if (!options.slug) options.slug = random(16)
    this._start('add-post-start')
    try {
      const res = await this.api.addPost(options)
      await this._setPost(res.data.post)
      await this._markReset()
      this._success('add-post-success')
      await this.loadPosts()
      if (options.categories) await this.loadCategories()
      if (options.tags) await this.loadTags()
    } catch (err) {
      this._fail('add-post-fail', err)
    }
    this._info('add-post-end')
  }

  async deletePostById (id) {
    if (!id && !this.state.post) throw new Error('id is required!')
    this._start('delete-post-id-start')
    try {
      const res = await this.api.deletePost(id || this.state.post._id)
      // TODO 可不可以写成  !id || this.state.post._id === id
      if ((this.state.post && this.state.post._id === id) || !id) {
        await this._setPost(null)
        await this._markReset()
      }
      this._success('delete-post-id-success', res.data.post)
      await this.loadPosts()
      // TODO 某些情况下可以不加载 cats 和 tags
      await this.loadCategories()
      await this.loadTags()
    } catch (err) {
      if (err.status === 404) {
        this._fail('delete-post-id-fail', err.data)
      } else {
        this._fail('delete-post-id-fail', err)
      }
    }
    this._info('delete-post-id-end')
  }

  async publishPostById (id) {
    if (!id && !this.state.post) throw new Error('id is required!')
    this._start('publish-post-id-start')
    try {
      const res = await this.api.publishPost(id || this.state.post._id)
      await this._setPost(res.data.post)
      await this.loadPosts()
      this._success('publish-post-id-success')
    } catch (err) {
      if (err.status === 404) {
        this._fail('publish-post-id-fail', err.data)
      } else {
        this._fail('publish-post-id-fail', err)
      }
    } finally {
      this._info('publish-post-id-end')
    }
  }

  async unpublishPostById (id) {
    if (!id && !this.state.post) throw new Error('id is required!')
    this._start('unpublish-post-id-start')
    try {
      const res = await this.api.unpublishPost(id || this.state.post._id)
      await this._setPost(res.data.post)
      await this.loadPosts()
      this._success('unpublish-post-id-success')
    } catch (err) {
      if (err.status === 404) {
        this._fail('unpublish-post-id-fail', err.data)
      } else {
        this._fail('unpublish-post-id-fail', err)
      }
    } finally {
      this._info('unpublish-post-id-end')
    }
  }

  async loadPostById (id, force) {
    // TODO 整理保存逻辑
    if (!force && this.state.post && (this.state.post._id === id)) return
    if (!force && !id && this.state.post) return
    if (!force && !this.state.saved) throw new Error('Unsaved file, use force=true to override')
    if (!id && !this.state.post) throw new Error('id is required!')
    this._start('load-post-id-start')
    try {
      const res = await this.api.getPost(id)
      await this._setPost(res.data.post)
      await this._markReset()
      this._success('load-post-id-success')
    } catch (err) {
      if (err.status === 404) {
        this._fail('load-post-id-fail', err.data)
      } else {
        this._fail('load-post-id-fail', err)
      }
    } finally {
      this._info('load-post-id-end')
    }
  }

  async closePost () {
    await this._setPost(null)
  }

  async deploy () {
    this._start('deploy-start')
    try {
      await this.api.deploy()
      this._success('deploy-success')
    } catch (err) {
      if (err.status === 503) {
        this._fail('deploy-fail', err.data)
      } else {
        this._fail('deploy-fail', err)
      }
    } finally {
      this._info('deploy-end')
    }
  }

  async syncGit () {
    this._start('syncGit-start')
    try {
      await this.api.syncGit()
      this._success('syncGit-success')
    } catch (err) {
      if (err.status === 503) {
        this._fail('syncGit-fail', err.data)
      } else {
        this._fail('syncGit-fail', err)
      }
    } finally {
      this._info('syncGit-end')
    }
  }

  async saveGit () {
    this._start('saveGit-start')
    try {
      await this.api.saveGit()
      this._success('saveGit-success')
    } catch (err) {
      if (err.status === 503) {
        this._fail('saveGit-fail', err.data)
      } else {
        this._fail('saveGit-fail', err)
      }
    } finally {
      this._info('saveGit-end')
    }
  }

  async isCurrentPost (_id) {
    if (!_id) return true
    if (this.state.post && this.state.post._id === _id) return true
    return false
  }

  _info (eventName, data) {
    this.emit(eventName, data)
    logger.log(eventName, data || '')
  }

  _fail (eventName, data) {
    this.emit(eventName, data)
    logger.error(eventName, data || '')
    throw data
  }

  _success (eventName, data) {
    this.emit(eventName, data)
    logger.log(eventName, data || '')
  }

  _start (eventName, data) {
    this.emit(eventName, data)
    logger.log(eventName, data || '')
  }

  _update (eventName, data) {
    this.emit(eventName, data)
    logger.warn(eventName, data || '')
  }
}
const hexoEditorCore = new HexoEditorCore()
export { Helper, hexoEditorCore }
