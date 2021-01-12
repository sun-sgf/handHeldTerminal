import request from '../../src/utils/request'

// 获取省
export function provinceApi() {
  return request({
    url: '/places/listProvinces',
    method: 'get',
  })
}
// 获取市
export function cityApi(query) {
  return request({
    url: '/places/theCity',
    method: 'get',
    params: query
  })
}
// 获取监狱
export function prisonApi(query) {
  return request({
    url: '/places/prison',
    method: 'get',
    params: query
  })
}
// 获取监狱
export function insertEquipmentApi(data) {
  return request({
    url: '/terminal/insertEquipment',
    method: 'post',
    data: data
  })
}