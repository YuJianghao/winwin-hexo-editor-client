export default async ({ router, app }) => {
  router.beforeEach((to, from, next) => {
    if (to.path === '/login')next()
    else {
      const isLoggedIn = app.store.state.isLoggedIn
      if (!isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  })
}
