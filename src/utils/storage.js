const loginToken = process.env.APP_NAME + '_LOGIN_TOKEN'

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
