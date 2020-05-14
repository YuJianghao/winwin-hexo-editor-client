import { loadLoginToken } from 'src/utils/storage'

export default async ({ router, app }) => {
  router.beforeEach((to, from, next) => {
    const isLoggedIn = app.store.state.isLoggedIn || !!loadLoginToken()
    if (!isLoggedIn) next('/login')
    else {
      if (to.path === '/login') next('/home')
      else next()
    }
  })
}
