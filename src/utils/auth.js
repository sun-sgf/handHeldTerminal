// import Cookies from 'js-cookie'
// 打包成app后cookie不能读取

const TokenKey = 'token'

export function getToken() {
  return localStorage.getItem(TokenKey);
  // return Cookies.get(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
  // return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
  // return Cookies.remove(TokenKey)
}
