import request from '../utils/request'


//首页查询
export const getCategoryGroup = ({ categoryId }) => {
  return request('GET', '/getAttrByCategoryId',
    { categoryId }
  )
}

export const getAttrdata = ({ id }) => {
  return request('GET', '/getAttrByGroup',
    { id }
  )
}

export const getTreeChild = ({ key }) => {
  return request('GET', '/brand/industrial/getTreeChild',
    { key }
  )
}

export const addorEditAttrGroup = ({ record }) => {
  return request('POST', '/brand/industrial/attrGroup',
    { record }
  )
}


export const getAllAttrByGroupIdSort = ({ id }) => {
  return request('GET', '/getAllAttrByGroupIdSort',
    { id }
  )
}