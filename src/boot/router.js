let isFirst = true
let isFirstToHome = true
let installed = false
import { Loading } from 'quasar'
import DispatcherService from 'src/service/DispatcherService'
import { Logger } from 'src/utils/logger'
import apis from 'src/api'

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
    if (to.path === '/install') {
      if (installed) {
        next('/')
        return
      } else {
        next()
        return
      }
    }
    if (!installed) {
      try {
        await apis.install.checkInstalled()
        installed = false
      } catch {
        installed = true
      }
      if (!installed) {
        next('/install')
        return
      }
    }
    if (!DispatcherService.ready)DispatcherService.setContext(app)
    if (!isFirst) {
      Loading.show()
    }
    if (!app.store.state.user.inited) {
      app.store.commit('user/init')
      try {
        await app.store.dispatch('user/info')
      } catch (_) {
        app.store.commit('user/logout')
      }
    }
    const isLoggedIn = app.store.state.user.isLoggedIn
    const toLogin = to.path === '/login'
    const toHome = to.path.indexOf('/home') === 0
    // 真值表干的漂亮啊！
    //                     toLogin
    //                   true    false
    // isLoggedIn true   /home   next
    //            false  next    /login
    if (isLoggedIn ^ toLogin) {
      if (isLoggedIn && toHome && isFirstToHome) {
        await DispatcherService.init()
        isFirstToHome = false
      }
      const isEdit = path => /^.*\/edit\/((?:[^/]+?))(?:\/(?=$))?$/i.test(path)
      const isView = path => /^.*\/view\/((?:[^/]+?))(?:\/(?=$))?$/i.test(path)
      if (!isEdit(from.path) && !isView(from.path)) {
        await DispatcherService.closePost()
      }
      next()
    } else if (isLoggedIn && toLogin) {
      next('/home')
      Loading.hide()
    } else {
      next('/login')
      Loading.hide()
    }
  })
}
