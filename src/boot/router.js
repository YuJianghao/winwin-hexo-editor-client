import Router from 'vue-router'
// https://github.com/vuejs/vue-router/issues/2881
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(() => { })
}

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ router, store }) => {
  router.beforeEach(async (to, from, next) => {
    if (store.state.user.first) {
      store.commit('user/check')
      await store.dispatch("user/info")
    }
    if (store.state.user.alive) {
      if (to.path === '/login') next(from.path)
      else next()
    } else {
      if (to.path !== '/login') next('/login')
      else next()
    }
  })
}
