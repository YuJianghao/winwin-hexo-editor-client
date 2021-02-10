import Vue from 'vue'
//#region listPosts
export function requestListPosts(state) {
  state.posts.loading = true
  state.posts.err = ''
}
export function successListPosts(state, postsList) {
  state.posts.loading = false
  postsList.map(post => {
    const obj = {}
    obj.status = 'ready'
    obj.data = post
    state.posts.data[post._id] = obj
  })
  state.posts.err = ''
}
export function failedListPosts(state, err) {
  state.posts.loading = false
  state.posts.err = err
}
//#endregion
//#region listPages
export function requestListPages(state) {
  state.pages.loading = true
  state.pages.err = ''
}
export function successListPages(state, pagesList) {
  state.pages.loading = false
  pagesList.map(page => {
    const obj = {}
    obj.status = 'ready'
    obj.data = page
    state.pages.data[page._id] = obj
  })
  state.pages.err = ''
}
export function failedListPages(state, err) {
  state.pages.loading = false
  state.pages.err = err
}
//#endregion
//#region listTags
export function requestListTags(state) {
  state.tags.loading = true
  state.tags.err = ''
}
export function successListTags(state, tagsList) {
  state.tags.loading = false
  tagsList.map(tag => {
    const obj = {}
    obj.status = 'ready'
    obj.data = tag
    state.tags.data[tag._id] = obj
  })
  state.tags.err = ''
}
export function failedListTags(state, err) {
  state.tags.loading = false
  state.tags.err = err
}
//#endregion
//#region listCategories
export function requestListCategories(state) {
  state.categories.loading = true
  state.categories.err = ''
}
export function successListCategories(state, categoriesList) {
  state.categories.loading = false
  categoriesList.map(category => {
    const obj = {}
    obj.status = 'ready'
    obj.data = category
    state.categories.data[category._id] = obj
  })
  state.categories.err = ''
}
export function failedListCategories(state, err) {
  state.categories.loading = false
  state.categories.err = err
}
//#endregion
//#region new
export function successNewPost(state, post) {
  state.posts.data[post._id] = {
    state: 'ready',
    data: post
  }
}
export function successNewPage(state, page) {
  state.pages.data[page._id] = {
    state: 'ready',
    data: page
  }
}
//#endregion
//#region update
export function requestUpdatePost(state, id) {
  state.posts.data[id].status = state.posts.data[id].status === 'edited' ? 'saving' : 'loading'
  state.posts.data[id].err = ''
}
export function successUpdatePost(state, post) {
  state.posts.data[post._id].status = 'ready'
  state.posts.data[post._id].data = post
  state.posts.data[post._id].err = ''
}
export function failedUpdatePost(state, { id, err }) {
  state.posts.data[id].status = state.posts.data[id].status === 'saving' ? 'edited' : 'ready'
  state.posts.data[id].err = err
}
export function requestUpdatepage(state, id) {
  state.pages.data[id].status = state.pages.data[id].status === 'edited' ? 'saving' : 'loading'
  state.pages.data[id].err = ''
}
export function successUpdatepage(state, page) {
  state.pages.data[page._id].status = 'ready'
  state.pages.data[page._id].data = page
  state.pages.data[page._id].err = ''
}
export function failedUpdatepage(state, { id, err }) {
  state.pages.data[id].status = state.pages.data[id].status === 'saving' ? 'edited' : 'ready'
  state.pages.data[id].err = err
}
//#endregion
//#region
export function successDeletePost(state, id) {
  Vue.delete(state.posts.data, id)
}
export function successDeletePage(state, id) {
  Vue.delete(state.pages.page, id)
}
//#endregion
