let isFirst = true
let installed = false
import { Loading } from 'quasar'
import DispatcherService from 'src/service/dispatcher_service'
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
    if (!installed) {
      try {
        await apis.install.checkInstalled()
        installed = false
      } catch {
        installed = true
      }
    }
    const toInstall = to.path === '/install'
    //                  installed
    //                  true   false
    // toinstall true   /      next()
    //           false  none /install
    if (installed && toInstall) {
      next('/')
      return
    } else if (!installed && toInstall) {
      next()
      return
    } else if (!installed && !toInstall) {
      next('/install')
      return
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
    // 真值表干的漂亮啊！
    //                     toLogin
    //                   true    false
    // isLoggedIn true   /home   next
    //            false  next    /login
    if (isLoggedIn ^ toLogin) {
      if (isLoggedIn && !DispatcherService.inited) {
        await DispatcherService.init()
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
