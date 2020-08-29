let isFirst = true
import { Loading } from 'quasar'
import * as actionTypes from 'src/store/dispatcher/action-types'
import { replaceQuery } from 'src/utils/url'
import { Logger } from 'src/utils/logger'

const logger = new Logger({ prefix: 'Router' })

export default async ({ router, app, store }) => {
  router.afterEach(() => {
    Loading.hide()
    if (isFirst) {
      const loading = document.getElementById('app-loading')
      loading.style.opacity = 0
      window.setTimeout(() => {
        loading.style.display = 'none'
      }, 500)
      isFirst = false
    }
  })
  router.beforeEach(async (to, from, next) => {
    logger.log('to', to.fullPath)
    if (!isFirst) {
      Loading.show()
    }
    if (!app.store.state.globalUser.inited) {
      app.store.commit('globalUser/init')
    }
    const isLoggedIn = app.store.state.globalUser.isLoggedIn
    const toLogin = to.path === '/login'
    // 真值表干的漂亮啊！
    //                     toLogin
    //                   true    false
    // isLoggedIn true   /home   next
    //            false  next    /login
    if (isLoggedIn && !toLogin) {
      if (isFirst) await store.dispatch(actionTypes.init)
      if (Object.keys(to.query).includes('mode') && !to.query.id) {
        const str = replaceQuery(to.fullPath, undefined, ['mode'])
        next({
          path: str,
          replace: true
        })
      } else if (to.query.id && ['edit', 'view'].includes(to.query.mode) && // 前提：确实要查看或编辑文章
        (!store.state.editorCore.data.article || // 文章没打开
          to.query.id !== store.state.editorCore.data.article._id) // 打开的文章不是需要的文章
      ) {
        let id = to.query.id
        const state = store.state.editorCore
        id = id || state.data.article._id
        if (id && !state.data.articles[id]) {
          const str = replaceQuery(to.fullPath, undefined, ['id', 'mode'])
          logger.log('Invalid article id:', id, '\n', 'Redirected to:', str)
          next({
            path: str,
            replace: true
          })
        } else {
          const payload = (id && id !== 'null') ? { _id: id } : {}
          if (to.query.mode === 'edit') store.dispatch(actionTypes.editPostById, payload)
          if (to.query.mode === 'view') store.dispatch(actionTypes.viewPostById, payload)
        }
      }
      next()
    } else if (isLoggedIn && toLogin) {
      next('/home')
      Loading.hide()
    } else {
      next('/login')
    }
  })
}
