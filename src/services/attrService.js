import request from '../utils/request'


//首页查询查询属性
//https://baseUrl/attribute?name=颜色&searchSupport=true&sort=asc&field=id&size=10&page=3
export const getCommodityAttrList = ({ page, size }) => {
  return request('GET', '/attribute', 
    { page, size }
  )
}

//新增编辑属性
export const editOraddAttr = ({ record }) => {
  return request('PUT', '/brand/attr/attribute', 
    { record }
  )
}