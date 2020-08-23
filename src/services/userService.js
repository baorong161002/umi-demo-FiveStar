import request from '../utils/request'

export const getUser = () => {
  return request('/ds/list')  // 定义请求的url
}
// export const getBrandList = () => {
//     return request('/brand/tableInfor')  // 定义请求的url
// }

//首页查询
export const getBrandList = ({ page, size }) => {
  return request('GET', '/brand/tableInfor', //url+参数发送get请求？
    { page, size }
  )
}

//根据表单查询
export const searchBrandInfor = ({ brandName, status, page, size }) => {
  return request('POST', '/brand/searchInfor',
    { brandName, status, page, size }
  )
}

//新增
export const addBrandInfor = ({ brandName, status, actionPerson, actionTime }) => {
  return request('POST', '/brand/addInfor',
  { brandName, status, actionPerson, actionTime }
  )
}

//新增
export const editBrandInfor = ({ key,brandName, status, actionPerson, actionTime }) => {
  return request('POST', '/brand/editInfor',
  {key, brandName, status, actionPerson, actionTime }
  )
}
//删除
export const deleteBrandInfor = ({ key }) => {
  return request('GET', '/brand/delete',
    { key }
  )
}