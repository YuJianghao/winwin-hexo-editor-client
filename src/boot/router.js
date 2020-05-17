import { loginStore } from 'src/stores/loginStore'

export default async ({ router, app }) => {
  router.beforeEach(async (to, from, next) => {
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
