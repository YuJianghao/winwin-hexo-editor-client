export async function init({ dispatch, rootState }) {
  await dispatch('user/info')
  if (rootState.user.alive)
    await Promise.all([
      dispatch('hexo/listPosts'),
      dispatch('hexo/listPages'),
      dispatch('hexo/listTags'),
      dispatch('hexo/listCategories')
    ])
}
