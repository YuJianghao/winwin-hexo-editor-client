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
export async function newPostOrPage({ dispatch }, opt = {}) {
  // TODO:添加文章的状态管理，fakeID？
  if (opt.title === undefined) throw new Error('title is required')
  await services.hexo.newPostOrPage(opt.title, opt)
  // TODO 更新本地数据
}
export async function updatePostOrPage({ dispatch }, opt = {}) {
  if (opt.id === undefined) throw new Error('id is required')
  if (opt.page === undefined) throw new Error('page is required')
  if (opt.obj === undefined) throw new Error('obj is required')
  await services.hexo.updatePostOrPage(opt.id, opt.page, opt.obj)
  // TODO 更新本地数据
}
export async function deletePostOrPage({ dispatch }, opt = {}) {
  if (opt.id === undefined) throw new Error('id is required')
  if (opt.page === undefined) throw new Error('page is required')
  await services.hexo.deletePostOrPage(opt.id, opt.page, opt.obj)
  // TODO 更新本地数据
}
