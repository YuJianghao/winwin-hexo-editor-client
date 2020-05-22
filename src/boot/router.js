let isFirst = true
import { loginStore } from 'src/stores/loginStore'
import { Loading } from 'quasar'

export default async ({ router, app }) => {
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
    if (!isFirst) {
      Loading.show()
    }
    if (typeof (loginStore.state.isLoggedIn) === 'undefined') {
      await loginStore.init()
    }
    const isLoggedIn = loginStore.state.isLoggedIn
    const toLogin = to.path === '/login'
    // 真值表干的漂亮啊！
    //                     toLogin
    //                   true    false
    // isLoggedIn true   /home   next
    //            false  next    /login
    if (isLoggedIn ^ toLogin) {
      next()
    } else if (isLoggedIn && toLogin) {
      next('/home')
    } else {
      next('/login')
    }
  })
}
