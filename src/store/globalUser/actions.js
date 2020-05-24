import users from 'src/api/users'
/*
export function someAction (context) {
}
*/
export async function login ({ commit }, { username, password }) {
  await users.getLoginToken(username, password)
  commit('login')
}
