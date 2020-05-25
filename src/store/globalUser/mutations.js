import { loadLoginToken, saveLoginToken } from 'src/utils/storage'
/*
export function someMutation (state) {
}
*/

export function init (state) {
  state.isLoggedIn = !!loadLoginToken()
  state.inited = true
}
export function login (state) {
  state.isLoggedIn = true
}
export function logout (state) {
  saveLoginToken('')
  state.isLoggedIn = false
}
