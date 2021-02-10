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
