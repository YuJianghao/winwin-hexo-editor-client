/*
export function someAction (context) {
}
*/

export async function deletePost ({ rootState, commit }, _id) {
  if (!_id) commit('closePost')
  if (rootState.editorCore.data.post && rootState.editorCore.data.post._id === _id) { commit('closePost') }
}
