import Vue from 'vue'
import Vuex from 'vuex'
import dispatcher from './dispatcher'
import user from './user'
import { store as userConfig } from './user_config'
import {
  core,
  ui,
  search,
  filter,
  sorter
} from './hexo'
import createLogger from 'vuex/dist/logger'

// import example from './module-example'

Vue.use(Vuex)
const state = {}

const mutations = {}

const plugins = process.env.DEV ? [createLogger({
  logActions: true,
  logMutations: true,
  filter (mutation) {
    return mutation.type.indexOf('hexoUi/') === 0 ||
      mutation.type.indexOf('hexoFilter/') === 0 ||
      mutation.type.indexOf('hexoSorter/') === 0
  }
})] : []
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
      hexoFilter: filter,
      hexoSorter: sorter,
      user,
      userConfig
    },
    plugins,

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
