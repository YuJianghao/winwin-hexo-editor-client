import { loginStore } from 'src/stores/loginStore'
import { Loading } from 'quasar'

export default async ({ router, app }) => {
  router.afterEach(() => {
    Loading.hide()
  })
  router.beforeEach(async (to, from, next) => {
    Loading.show({
      message: '正在加载'
    })
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
