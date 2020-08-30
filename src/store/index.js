import Vue from 'vue'
import Vuex from 'vuex'
import dispatcher from './dispatcher'
import user from './user'
import { core, ui, search } from './hexo'

// import example from './module-example'

Vue.use(Vuex)
const state = {}

const mutations = {}
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    mutations,
    modules: {
      dispatcher,
      hexoUi: ui,
      hexoCore: core,
      hexoSearch: search,
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
