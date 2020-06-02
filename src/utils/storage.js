const loginToken = 'WINWIN_HEXO_EDITOR_LOGIN_TOKEN'
const refreshToken = 'WINWIN_HEXO_EDITOR_REFRESH_TOKEN'

export function saveLoginToken (token) {
  try {
    localStorage.setItem(loginToken, token)
  } catch {
    var err = new Error('Storage Error')
    err.message = '由于Web Storage API错误，数据未成功保存'
    throw err
  }
}

export function loadLoginToken () {
  return localStorage.getItem(loginToken)
}

export function saveRefreshToken (token) {
  try {
    localStorage.setItem(refreshToken, token)
  } catch {
    var err = new Error('Storage Error')
    err.message = '由于Web Storage API错误，数据未成功保存'
    throw err
  }
}

export function loadRefreshToken () {
  return localStorage.getItem(refreshToken)
}
