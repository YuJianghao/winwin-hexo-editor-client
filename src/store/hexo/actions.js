import services from "src/services"
export async function listPosts({ commit }) {
  commit('requestListPosts')
  try {
    const postsList = await services.hexo.listPosts()
    commit('successListPosts', postsList)
  } catch (err) {
    commit('failedListPosts', err)
  }
}
export async function listPages({ commit }) {
  commit('requestListPages')
  try {
    const postsList = await services.hexo.listPages()
    commit('successListPages', postsList)
  } catch (err) {
    commit('failedListPages', err)
  }
}
export async function listTags({ commit }) {
  commit('requestListTags')
  try {
    const postsList = await services.hexo.listTags()
    commit('successListTags', postsList)
  } catch (err) {
    commit('failedListTags', err)
  }
}
export async function listCategories({ commit }) {
  commit('requestListCategories')
  try {
    const postsList = await services.hexo.listCategories()
    commit('successListCategories', postsList)
  } catch (err) {
    commit('failedListCategories', err)
  }
}
export async function newPostOrPage({ commit, dispatch }, opt = {}) {
  // TODO:添加文章的状态管理，fakeID？
  if (opt.title === undefined) throw new Error('title is required')
  const res = await services.hexo.newPostOrPage(opt.title, opt)
  if (res.__post) {
    commit('successNewPost', res)
    dispatch('listTags')
    dispatch('listCategories')
  } else commit('successNewPage', res)
}
export async function updatePostOrPage({ state, commit, dispatch }, opt = {}) {
  if (opt.id === undefined) throw new Error('id is required')
  if (opt.page === undefined) throw new Error('page(boolean) is required')
  if (!opt.page) commit('requestUpdatePost', opt.id)
  else commit('requestUpdatePage'.opt.id)
  try {
    const obj = {}
    if (!opt.page) {
      Object.assign(obj, state.posts.data[opt.id].data.fm)
      Object.assign(obj, state.posts.data[opt.id].modify)
    } else {
      Object.assign(obj, state.pages.data[opt.id].data.fm)
      Object.assign(obj, state.pages.data[opt.id].modify)
    }
    if (opt.obj) Object.assign(obj, opt.obj)
    const res = await services.hexo.updatePostOrPage(opt.id, opt.page, obj)
    if (!opt.page) {
      commit('successUpdatePost', res)
      dispatch('listTags')
      dispatch('listCategories')
    } else commit('successUpdatePage', res)
  } catch (err) {
    if (!opt.page) commit('failedUpdatePost', { id: opt.id, err })
    else commit('failedUpdatePage', { id: opt.id, err })
  }
}
export async function deletePostOrPage({ commit, dispatch }, opt = {}) {
  if (opt.id === undefined) throw new Error('id is required')
  if (opt.page === undefined) throw new Error('page is required')
  await services.hexo.deletePostOrPage(opt.id, opt.page)
  if (!opt.page) {
    commit('successDeletePost', opt.id)
    dispatch('listTags')
    dispatch('listCategories')
  } else commit('successDeletePage', opt.id)
}
