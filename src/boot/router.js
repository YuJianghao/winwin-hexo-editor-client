import { loginStore } from 'src/stores/loginStore'

export default async ({ router, app }) => {
  router.beforeEach((to, from, next) => {
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
