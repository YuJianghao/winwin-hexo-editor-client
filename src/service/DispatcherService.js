import { debounce } from 'quasar'
import * as hexoCoreActionTypes from 'src/store/hexo/core/action-types'
import * as hexoFilterMutationTypes from 'src/store/hexo/filter/mutation-types'
import * as hexoFilterByTypes from 'src/store/hexo/filter/by-types'
import * as hexoSorterMutationTypes from 'src/store/hexo/sorter/mutation-types'
import * as hexoSorterByTypes from 'src/store/hexo/sorter/by-types'
import { DialogService, DialogType } from './DialogService'
import { Logger } from 'src/utils/logger'
import message from 'src/utils/message'
const logger = new Logger({ prefix: 'DispatcherService' })

class DispatcherService {
  constructor () {
    this.ready = false
    this.message = message
  }

  // #region internal functions
  setContext (ctx) {
    this.ctx = ctx
    this.ready = true
  }

  async dispatch () {
    return this.store.dispatch(...arguments)
  }

  commit () {
    return this.store.commit(...arguments)
  }

  get store () {
    return this.ctx.$store || this.ctx.store
  }

  get state () {
    return this.store.state
  }

  get getters () {
    return this.store.getters
  }

  get router () {
    return this.ctx.$router || this.ctx.router
  }

  get route () {
    return this.ctx.$route || this.ctx.route
  }
  // #endregion

  // #region lifecycle
  async init () {
    try {
      this.commit('hexoUi/init')
      this.commit('hexoUi/showLoading')
      this.commit('user/init')
      await this.dispatch('hexoCore/' + hexoCoreActionTypes.init)
      await this.dispatch('hexoSearch/init')
      this.commit('hexoFilter/' + hexoFilterMutationTypes.SET_FILTER, { by: hexoFilterByTypes.ALL })
      this.commit('hexoSorter/' + hexoSorterMutationTypes.SET_SORTER, { by: hexoSorterByTypes.DATE })
    } catch (err) {
      if (process.env.DEV)logger.warn(err)
      if (err.status === 401) return
      if (err.name === 'AsyncRaceAbort') return
      this.message.error({ message: '初始化失败' })
    } finally {
      this.commit('hexoUi/hideLoading')
    }
    this.autoSavePost = debounce(this.savePost, 3000)
  }

  async destory () {
    this.commit('hexoUi/destroy')
    this.commit('hexoFilter/' + hexoFilterMutationTypes.SET_FILTER, { by: hexoFilterByTypes.ALL })
    await this.dispatch('hexoCore/' + hexoCoreActionTypes.destroy)
  }

  // #endregion

  // #region load

  async reload (force = false) {
    try {
      this.commit('hexoUi/showLoading')
      await this.dispatch('hexoCore/' + hexoCoreActionTypes.reload, force)
      message.success({ message: '重载成功' })
    } catch (err) {
      if (err.status === 401) return
      if (err.name === 'AsyncRaceAbort') return
      this.message.error({ message: '重载失败', caption: err.message })
    } finally {
      this.commit('hexoUi/hideLoading')
    }
  }
  // #endregion

  // #region Post
  async viewPostById (_id = null, force = false) {
    if (force) this.cancelSave()
    // 如果不是强制且没有保存，且不是当前已经打开的文章，则请求保存
    const requestSave = (!force && !this.getters['hexoCore/isPostSaved']) &&
      (_id && (_id !== this.getters['hexoCore/dataPostId']))
    try {
      if (requestSave) {
        const { type } = await DialogService.create(DialogType.ConfirmDialog, {
          message: '要退出么，未保存的文件会丢失',
          okLabel: '退出',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        this.viewPostById(_id, true)
      } else {
        await this.dispatch('hexoCore/' + hexoCoreActionTypes.loadArticleById, { _id, force })
      }
    } catch (err) {
      if (process.env.DEV)logger.warn(err)
      throw err
    }
  }

  async addPostByDefault () {
    try {
      if (!this.getters['hexoCore/isPostSaved']) {
        const { type } = await DialogService.create(DialogType.ConfirmDialog, {
          message: '要离开么，未保存的文件会丢失',
          okLabel: '离开',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
      }
      this.cancelSave()
      const { type, data } = await DialogService.create(DialogType.NewPostDialog)
      if (type === 'ok') {
        const newId = await this.dispatch('hexoCore/' + hexoCoreActionTypes.addArticleBase, { options: data })
        console.log(newId)
        this.router.push({
          name: 'edit',
          params: {
            id: newId
          }
        })
      }
    } catch (err) {
      if (process.env.DEV)logger.warn(err)
      if (err.status === 401) return
      if (err.name === 'AsyncRaceAbort') return
      this.message.error({ message: '新建失败', caption: err.message })
    }
  }

  async deletePostById (_id) {
    const post = this.state.hexoCore.data.articles[_id || this.state.hexoCore.data.article._id]
    const message = `你确认要删除《${post.title}》么？`
    // if (post.date)message += `（最后编辑于${date.formatDate(post.date, 'YYYY年MM月DD日 HH:mm:ss')}）`

    const { type } = await DialogService.create(DialogType.ConfirmDialog, {
      title: '删除确认',
      message,
      okLabel: '删除',
      okColor: 'red',
      cancelColor: 'primary',
      focus: 'cancel'
    })
    if (type !== 'ok') return
    try {
      this.cancelSave()
      const deletedId = await this.dispatch('hexoCore/' + hexoCoreActionTypes.deleteArticleById, { _id, force: true })
      if (deletedId === this.route.params.id && this.route.path !== '/home') { this.router.push('/home') }
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      this.message.error({ message: '删除失败', caption: err.message })
    }
  }

  async closePost () {
    await this.dispatch('hexoCore/' + hexoCoreActionTypes.closeArticle)
  }

  async editPostById (_id = null, force = false) {
    if (force) this.cancelSave()
    // 如果不是强制且没有保存，且不是当前已经打开的文章，则请求保存
    const requestSave = (!force && !this.getters['hexoCore/isPostSaved']) &&
      (_id && (_id !== this.getters['hexoCore/dataPostId']))
    try {
      if (requestSave) {
        const { type } = await DialogService.create(DialogType.ConfirmDialog, {
          message: '要退出么，未保存的文件会丢失',
          okLabel: '退出',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        await this.editPostById(_id, true)
      } else {
        await this.dispatch('hexoCore/' + hexoCoreActionTypes.loadArticleById, { _id, force })
      }
    } catch (err) {
      if (process.env.DEV)logger.warn(err)
      throw err
    }
  }

  async publishPostById (_id = null, force = false) {
    if (force) this.cancelSave()
    try {
      if (!force && !this.getters['hexoCore/isPostSaved']) {
        const { type } = await DialogService.create(DialogType.ConfirmDialog, {
          message: '要退出么，未保存的文件会丢失',
          okLabel: '退出',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        return this.publishPostById(_id, true)
      } else {
        const { oldId, newId } = await this.dispatch('hexoCore/' + hexoCoreActionTypes.publishPostById, { _id, force })
        if (this.route.params.id === oldId) {
          this.router.push({
            name: this.router.name,
            params: {
              id: newId
            }
          })
        }
      }
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '发布失败', caption: err.message })
    }
  }

  async unpublishPostById (_id = null, force = false) {
    if (force) this.cancelSave()
    try {
      if (!force && !this.getters['hexoCore/isPostSaved']) {
        const { type } = await DialogService.create(DialogType.ConfirmDialog, {
          message: '你确认要取消发布么？未保存的文件会丢失',
          okLabel: '继续取消发布',
          okColor: 'red',
          cancelLabel: '返回',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        this.publishPostById(_id, true)
      } else {
        const { type } = await DialogService.create(DialogType.ConfirmDialog, {
          message: '你确认要取消发布么？取消后无法撤销，再次发布的文章地址也会变更',
          okLabel: '取消发布',
          okColor: 'red',
          cancelColor: 'primary',
          focus: 'cancel'
        })
        if (type !== 'ok') return
        const { oldId, newId } = await this.dispatch('hexoCore/' + hexoCoreActionTypes.unpublishPostById, { _id, force })
        if (this.route.params.id === oldId) {
          this.router.push({
            name: this.router.name,
            params: {
              id: newId
            }
          })
        }
      }
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '发布失败', caption: err.message })
    }
  }

  async setPostByPost (article) {
    await this.dispatch('hexoCore/' + hexoCoreActionTypes.updateArticle, article)
    await this.autoSavePost(true)
  }

  cancelSave () {
    this.saveCanceled = true
  }

  async savePost (isAuto) {
    // TODO: 需要改进
    if (this.saveCanceled) {
      this.saveCanceled = false
      return
    }
    try {
      if (!isAuto) this.commit('hexoUi/showLoading', { message: '正在保存', delay: 100 })
      await this.dispatch('hexoCore/' + hexoCoreActionTypes.saveArticle)
      if (!isAuto) message.success({ message: '保存成功' })
    } catch (err) {
      if (err.status === 404) {
        err.message = '列表已更新，请刷新'
      }
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '保存失败', caption: err.message })
    } finally {
      this.commit('hexoUi/hideLoading')
    }
  }
  // #endregion

  // #region hexo actions
  async deploy () {
    const { type } = await DialogService.create(DialogType.ConfirmDialog, {
      message: '确定部署博客么？',
      focus: 'ok'
    })
    if (type !== 'ok') return
    try {
      this.commit('hexoUi/showLoading', { message: '正在部署', delay: 100 })
      await this.dispatch('hexoCore/' + hexoCoreActionTypes.deploy)
      message.success({ message: '部署完成' })
    } catch (err) {
      if (err.status === 503) err.message = '请配置`hexo deploy`命令'
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '部署失败', caption: err.message })
    } finally {
      this.commit('hexoUi/hideLoading')
    }
  }

  async generate () {
    try {
      this.commit('hexoUi/showLoading', { message: '正在生成', delay: 100 })
      await this.dispatch('hexoCore/' + hexoCoreActionTypes.generate)
      message.success({ message: '生成完成' })
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '生成失败', caption: err.message })
    } finally {
      this.commit('hexoUi/hideLoading')
    }
  }

  async clean () {
    try {
      this.commit('hexoUi/showLoading', { message: '正在清理', delay: 100 })
      await this.dispatch('hexoCore/' + hexoCoreActionTypes.clean)
      message.success({ message: '清理完成' })
    } catch (err) {
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '清理失败', caption: err.message })
    } finally {
      this.commit('hexoUi/hideLoading')
    }
  }
  // #endregion

  // #region git actions
  async syncGit () {
    const { type } = await DialogService.create(DialogType.ConfirmDialog, {
      message: '确定从git同步么？未保存到git的文件将丢失',
      okLabel: '放弃文件并同步',
      okColor: 'red',
      cancelLabel: '返回',
      cancelColor: 'primary',
      focus: 'cancel'
    })
    if (type !== 'ok') return
    try {
      this.commit('hexoUi/showLoading', { message: '正在从GIT同步', delay: 100 })
      await this.dispatch('hexoCore/' + hexoCoreActionTypes.syncGit)
      message.success({ message: '同步完成' })
    } catch (err) {
      if (err.status === 503) err.message = '请配置Git命令'
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      this.commit('hexoUi/hideLoading')
    }
  }

  async saveGit () {
    try {
      this.commit('hexoUi/showLoading', { message: '正在同步到GIT', delay: 100 })
      await this.dispatch('hexoCore/' + hexoCoreActionTypes.saveGit)
      message.success({ message: '同步完成' })
    } catch (err) {
      if (err.status === 503) err.message = '请配置Git远端仓库'
      if (err.name === 'AsyncRaceAbort') return
      message.error({ message: '同步失败', caption: err.message })
    } finally {
      this.commit('hexoUi/hideLoading')
    }
  }
  // #endregion

  // #region UI
  async toggleFull () {
    this.commit('hexoUi/toggleFull')
  }
  // #endregion

  // #region search
  async search (q = '', size = '') {
    await this.dispatch('hexoSearch/search', { q, size })
  }
}

export default new DispatcherService()
