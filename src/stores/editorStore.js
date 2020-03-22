import { EventEmitter } from 'events'
import random from 'string-random'
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
      ready: false,
      posts: {},
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
      get filteredPostsList () {
        try {
          if (this.filterBy.type === 'all') return this.postsList
          if (this.filterBy.type === 'categories') return this.categories[this.filterBy._id].posts.map(_id => this.posts[_id])
          if (this.filterBy.type === 'tags') return this.tags[this.filterBy._id].posts.map(_id => this.posts[_id])
          if (this.filterBy.type === 'uncategorized') return this.postsList.filter(post => !post.categories)
          throw new Error('invalid')
        } catch (__) {
          if (ctx.debug) console.warn(`invalid type ${this.filterBy.type} with _id ${this.filterBy._id}, returning postsList`)
          this.filterBy.type = 'all'
          return this.filteredPostsList
        }
        // TODO
      },
      filterBy: {
        type: 'all',
        _id: null
      }
    }
  }

  /**
   * 初始化客户端数据
   * @param {Object} opts 初始化选项
   * @param {Object} opts.api hexo-client-sdk-api实例
   * @param {String} [opts.addr='http://localhost:5777/hexoeditorserver'] 服务器地址
   * @param {Boolean} [opts.debug=false]
   */
  async init (opts) {
    this.addr = opts.addr || 'http://localhost:5777/hexoeditorserver'
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

  async reload () {
    if (this.state.post) await this.loadPostById(this.state.post._id)
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
      if (this.debug) console.warn(`categories ${_id} not exists, returning`)
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
      if (this.debug) console.warn(`tags ${_id} not exists, returning`)
      return
    }
    this.state.filterBy.type = 'tags'
    this.state.filterBy._id = _id
  }

  // get posts () {
  //   return this._posts
  // }

  // get postsList () {
  //   return Helper.objectToList(this.state.posts)
  // }

  // get categories () {
  //   return this._categories
  // }

  // get categoriesList () {
  //   return Helper.objectToList(this._categories)
  // }

  // get tags () {
  //   return this._tags
  // }

  // get tagsList () {
  //   return Helper.objectToList(this._tags)
  // }

  // get post () {
  //   return this._post
  // }

  // get postTags () {
  //   if (!this._post) return null
  //   return this._post.tags
  // }

  // get postCategories () {
  //   if (!this._post) return null
  //   return this._post.categories
  // }

  // get postCategoriesArray2d () {
  //   if (!this._post) return [[null]]
  //   if (!this.post.categories) return [[]]
  //   return Helper.postCategoriesArray2d(this.post.categories)
  // }

  // get saved () {
  //   return this._saved
  // }

  // get changed () {
  //   return this._changed
  // }

  // async destory () {
  //   this._posts = {}
  //   this._categories = {}
  //   this._tags = {}
  //   this._post = null
  // }

  async _markChanged () {
    this._update('markChanged')
    this.change = true
    this._saved = false
  }

  async _markReset () {
    this._info('markReset')
    this._changed = false
    this._saved = true
  }

  async _markSaved () {
    this._success('markSaved')
    this._saved = true
  }

  async _setPost (post) {
    this.state.post = post
    this._update('post-update', this.state.post)
  }

  // async savePost () {
  //   if (!this._post || this._saved) return
  //   this._success('save-post-start')
  //   try {
  //     const res = await this.api.updatePost(this._post._id, this._post)
  //     await this._setPost(res.data.post)
  //     await this._markSaved()
  //     this._success('save-post-success', this._post)
  //     await this.loadPosts()
  //     await this.loadCategories()
  //     await this.loadTags()
  //   } catch (err) {
  //     this._fail('save-post-fail', err)
  //   } finally {
  //     this._info('save-post-end')
  //   }
  // }

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

  async setPostByTitle (title = '新文章') {
    if (!title && this.debug) console.warn('no title given, using default')
    this._update('set-post-title')
    await this._markChanged()
    await this._setPost({ ...this.state.post, ...{ title } })
  }

  async setPostByContent (_content = '') {
    if (!_content && this.debug) console.warn('no _content given, using default')
    this._update('set-post-_content')
    await this._markChanged()
    await this._setPost({ ...this.state.post, ...{ _content } })
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
    if (!force && !this._saved) throw new Error('Unsaved file, use force=true to override')
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

  // async publishPostById (id) {
  //   if (!id && !this._post) throw new Error('id is required!')
  //   this._start('publish-post-id-start')
  //   try {
  //     const res = await this.api.publishPost(id || this._post._id)
  //     await this._setPost(res.data.post)
  //     this._success('publish-post-id-success')
  //   } catch (err) {
  //     if (err.status === 404) {
  //       this._fail('publish-post-id-fail', err.data)
  //     } else {
  //       this._fail('publish-post-id-fail', err)
  //     }
  //   } finally {
  //     this._info('publish-post-id-end')
  //   }
  // }

  // async unpublishPostById (id) {
  //   if (!id && !this._post) throw new Error('id is required!')
  //   this._start('unpublish-post-id-start')
  //   try {
  //     const res = await this.api.unpublishPost(id || this._post._id)
  //     await this._setPost(res.data.post)
  //     this._success('unpublish-post-id-success')
  //   } catch (err) {
  //     if (err.status === 404) {
  //       this._fail('unpublish-post-id-fail', err.data)
  //     } else {
  //       this._fail('unpublish-post-id-fail', err)
  //     }
  //   } finally {
  //     this._info('unpublish-post-id-end')
  //   }
  // }

  async loadPostById (id, force) {
    if (!force && !this._saved) throw new Error('Unsaved file, use force=true to override')
    if (!id && !this.state.post) throw new Error('id is required!')
    if (!id && this.state.post) return
    if (this.state.post && this.state.post._id === id) return
    this._start('load-post-id-start')
    try {
      const res = await this.api.getPost(id)
      await this._setPost(res.data.post)
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

  _info (eventName, data) {
    this.emit(eventName, data)
    if (this.debug) {
      console.log('%c' + eventName, 'color: #fff; background: #1a8bed; padding: 0 5px; ')
      if (data) console.log(data)
    }
  }

  _fail (eventName, data) {
    this.emit(eventName, data)
    if (this.debug) {
      console.log('%c' + eventName, 'color: #fff; background: #f44336; padding: 0 5px; ')
      if (data) console.log(data)
    }
  }

  _success (eventName, data) {
    this.emit(eventName, data)
    if (this.debug) {
      console.log('%c' + eventName, 'color: #fff; background: #21ba45; padding: 0 5px; ')
      if (data) console.log(data)
    }
  }

  _start (eventName, data) {
    this.emit(eventName, data)
    if (this.debug) {
      console.log('%c' + eventName, 'color: #fff; background: #21ba45; padding: 0 5px; ')
      if (data) console.log(data)
    }
  }

  _update (eventName, data) {
    this.emit(eventName, data)
    if (this.debug) {
      console.log('%c' + eventName, 'color: #fff; background: #ff9800; padding: 0 5px; ')
      if (data) console.log(data)
    }
  }
}
const hexoEditorCore = new HexoEditorCore()
export { Helper, hexoEditorCore }
