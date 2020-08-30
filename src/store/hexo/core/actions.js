import * as mutationTypes from './mutation-types'
import * as actionTypes from './action-types'

import { Logger } from 'src/utils/logger'
const logger = new Logger({ prefix: 'hexoCore/Actions' })

// services
import * as postService from 'src/service/post'
import * as categoryService from 'src/service/category'
import * as tagService from 'src/service/tag'
import * as hexoService from 'src/service/hexo'

import { listToObject, replaceErrorMessage } from 'src/utils/common'
import { redirect, replaceQuery } from 'src/utils/url'

/**
  * 验证id是否有效（无效则引发异常），是否是当前文章id
  * @param {Object} state 状态
  * @param {String} _id 需要查询的id
  */
function getValidId (state, _id) {
  if (!state.data.article && !_id) throw new Error('No article opened, _id is required!')
  const validId = _id || state.data.article._id
  if (validId && !state.data.articles[validId]) throw new Error('Invalid article id ' + validId)
  return validId
}

/**
  * 验证是否试图在非强制情况下放弃更改，是则引发异常
  * @param {Object} state 状态
  * @param {Boolean} force 是否强制操作
  */
function checkSaved (state, force) {
  if (!state.status.saved && !force) throw new Error('Unsaved change, use force=true to override.')
}

const actions = {
  /**
   * 初始化数据
   */
  async [actionTypes.init] ({ commit, dispatch }) {
    commit(mutationTypes.setReady, true)
    await dispatch(actionTypes.loadAll)
    commit(mutationTypes.setLoading, true)
  },

  /**
   * 销毁数据
   */
  async [actionTypes.destroy] ({ commit }) {
    commit(mutationTypes.closeArticle)
    commit(mutationTypes.resetAll)
    commit(mutationTypes.setReady, false)
  },

  /**
  * 刷新数据
  * @param {Boolean} [force] 是否强制载入（暂时未启用）
  */
  async [actionTypes.reload] ({ dispatch }, force) {
    await dispatch(actionTypes.loadAll)
  },

  /**
  * 从参数新建文章
  * @param {Object} payload 参数
  * @param {Boolean} [payload.force=false] 是否放弃当前未保存的更改
  * @param {Object} [payload.options={}] 新文章的选项
  */
  async [actionTypes.addArticleBase] ({ state, commit, dispatch }, payload = {}) {
    if (!payload.force && !state.status.saved) throw new Error('Unsaved file, use force=true to override')
    let article = null
    try {
      const defaultOpt = {
        title: '新文章'
      }
      article = await postService.addArticle(Object.assign(defaultOpt, payload.options))
    } catch (err) {
      throw replaceErrorMessage(err, '新建文章失败，请稍后再试')
    }
    try {
      await dispatch(actionTypes.loadArticles)
      if (article.categories) await dispatch('loadCategories')
      if (article.tags) await dispatch('loadTags')
      commit(mutationTypes.loadArticle, article)
      redirect(replaceQuery(window.location.href, { id: article._id }))
    } catch (err) {
      throw replaceErrorMessage(err, '新文章创建成功，但数据更新失败，请手动刷新')
    }
  },

  /**
  * 载入所有数据
  */
  async [actionTypes.loadAll] ({ dispatch }) {
    await Promise.all([
      dispatch(actionTypes.loadArticles),
      dispatch(actionTypes.loadCategories),
      dispatch(actionTypes.loadTags)
    ])
  },

  /**
  * 载入文章列表
  */
  async [actionTypes.loadArticles] ({ commit }) {
    try {
      const articles = await postService.getArticleList()

      // TODO:如果post和page的_id重复了就会报错
      commit(mutationTypes.loadArticles, listToObject(articles))
    } catch (err) {
      throw replaceErrorMessage(err, '文章列表获取失败，请稍后再试')
    }
  },
  /**
  * 载入分类列表
  */
  async [actionTypes.loadCategories] ({ commit }) {
    try {
      const categories = await categoryService.getCategories()
      commit(mutationTypes.loadCategories, listToObject(categories))
    } catch (err) {
      throw replaceErrorMessage(err, '分类获取失败，请稍后再试')
    }
  },

  /**
  * 载入标签列表
  */
  async [actionTypes.loadTags] ({ commit }) {
    try {
      const tags = await tagService.getTags()
      commit(mutationTypes.loadTags, listToObject(tags))
    } catch (err) {
      throw replaceErrorMessage(err, '标签获取失败，请稍后再试')
    }
  },

  async [actionTypes.updateArticle] ({ commit }, article) {
    commit(mutationTypes.updateArticle, article)
  },

  /**
  * 保存文章
  */
  async [actionTypes.saveArticle] ({ state, dispatch, commit }) {
    try {
      await postService.saveArticle(state.data.article)
      commit(mutationTypes.saveArticle)
    } catch (err) {
      throw replaceErrorMessage(err, '保存失败，请稍后再试')
    }
  },

  /**
  * 从id载入文章
  * @param {Object} payload 参数
  * @param {String} [payload._id] 需要加载的文章id，默认未当前已打开文章
  * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
  */
  async [actionTypes.loadArticleById] ({ state, commit }, payload = {}) {
    const _id = payload._id || null
    const force = payload.force || false
    const validId = getValidId(state, _id, force)

    const href = replaceQuery(window.location.href, { id: validId })

    if (href !== window.location.href) redirect(href)

    let isSameArticle
    if (state.data.article &&
      state.data.article._id === validId) {
      logger.log('Use opened article', validId)
      isSameArticle = true
    } else {
      isSameArticle = false
    }
    if (isSameArticle) return
    checkSaved(state, force)
    let finished = false
    try {
      window.setTimeout(_ => {
        if (!finished) { commit(mutationTypes.setLoading, true) }
      }, 100)
      const isPage = state.data.articles[validId].layout === 'page'
      const article = await postService.getArticleById(validId, isPage)
      commit(mutationTypes.loadArticle, article)
    } catch (err) {
      throw replaceErrorMessage(err, '文章获取失败，请稍后或刷新后再试')
    } finally {
      finished = true
      commit(mutationTypes.setLoading, false)
    }
  },

  /**
  * 从id删除文章
  * @param {Object} payload 参数
  * @param {String} [payload._id] 需要删除的文章id，默认未当前已打开文章
  * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
  */
  async [actionTypes.deleteArticleById] ({ state, commit, dispatch }, payload = {}) {
    const _id = payload._id || null
    const force = payload.force || false
    const validId = getValidId(state, _id, force)
    checkSaved(state, force)
    try {
      await postService.deleteArticleById(validId)
    } catch (err) {
      throw replaceErrorMessage(err, '删除失败，请稍后再试')
    }
    try {
      await dispatch(actionTypes.loadAll)
      redirect(replaceQuery(window.location.href, undefined, 'id'))
    } catch (err) {
      throw replaceErrorMessage(err, '文章已删除，但数据更新失败，请手动刷新')
    }
  },

  /**
  * 从id发布文章
  * @param {Object} payload 参数
  * @param {String} [payload._id] 需要发布的文章id，默认未当前已打开文章
  * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
  */
  async [actionTypes.publishPostById] ({ state, commit, dispatch }, payload = {}) {
    const _id = payload._id || null
    const force = payload.force || false
    const validId = getValidId(state, _id, force)
    checkSaved(state, force)
    let post
    try {
      post = await hexoService.publishPost(validId)
      commit(mutationTypes.loadArticle, post)
    } catch (err) {
      throw replaceErrorMessage(err, '文章发布失败，请稍后再试')
    }
    try {
      await dispatch(actionTypes.loadArticles)
      redirect(replaceQuery(window.location.href, { id: post._id }))
    } catch (err) {
      throw replaceErrorMessage(err, '文章已发布，但数据更新失败，请手动刷新')
    }
  },

  /**
  * 从id取消发布文章
  * @param {Object} payload 参数
  * @param {String} [payload._id] 需要取消发布的文章id，默认未当前已打开文章
  * @param {Boolean} [payload.force] 是否放弃当前未保存的更改
  */
  async [actionTypes.unpublishPostById] ({ state, commit, dispatch }, payload = {}) {
    const _id = payload._id || null
    const force = payload.force || false
    const validId = getValidId(state, _id, force)
    checkSaved(state, force)
    let post
    try {
      post = await hexoService.unpublishPost(validId)
      commit(mutationTypes.loadArticle, post)
    } catch (err) {
      throw replaceErrorMessage(err, '取消发布失败，请稍后再试')
    }
    try {
      await dispatch(actionTypes.loadArticles)
      redirect(replaceQuery(window.location.href, { id: post._id }))
    } catch (err) {
      throw replaceErrorMessage(err, '已取消发布，但数据更新失败，请手动刷新')
    }
  },

  async [actionTypes.saveGit] () {
    try {
      await hexoService.saveGit()
    } catch (err) {
      throw replaceErrorMessage(err, '保存到git失败，请稍后再试')
    }
  },

  async [actionTypes.syncGit] () {
    try {
      await hexoService.syncGit()
    } catch (err) {
      throw replaceErrorMessage(err, '从git同步失败，请稍后再试')
    }
    try {
      redirect(replaceQuery(window.location.href, undefined, ['mode', 'id']))
    } catch (err) {
      throw replaceErrorMessage(err, '同步成功，但数据更新失败，请手动刷新')
    }
  },

  async [actionTypes.deploy] () {
    try {
      await hexoService.deploy()
    } catch (err) {
      throw replaceErrorMessage(err, '部署失败，请稍后再试')
    }
  },

  async [actionTypes.generate] () {
    try {
      await hexoService.generate()
    } catch (err) {
      throw replaceErrorMessage(err, '生成失败，请稍后再试')
    }
  },

  async [actionTypes.clean] () {
    try {
      await hexoService.clean()
    } catch (err) {
      throw replaceErrorMessage(err, '清理失败，请稍后再试')
    }
  }

}
export default actions
