import request from '../../src/utils/request'
// 登录方法
export function loginApi(data) {

  return request({
    url: '/appLogin',
    method: 'post',
    data: data
  })
}