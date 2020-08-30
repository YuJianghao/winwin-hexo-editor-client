import * as mutations from './mutations'

export default {
  namespaced: true,
  state: {
    full: false,
    loading: {
      // 全局加载
      show: false
    }
  },
  mutations
}
