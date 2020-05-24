import Vue from 'vue'
import Vuex from 'vuex'
import dispatcher from './dispatcher'
import globalUser from './globalUser'
import editorUi from './editorUi'
import editorCore from './editorCore'
import editorFilter from './editorFilter'
import editorSorter from './editorSorter'

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
      editorUi,
      editorCore,
      editorFilter,
      editorSorter,
      globalUser
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
