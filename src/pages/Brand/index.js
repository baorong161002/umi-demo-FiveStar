import React, { Component } from 'react';
import BrandConfirmChild from './components/BrandConfirmChild'
import { connect } from 'dva';
import BreadcrumbContent from '../../components/breadContent'


const BrandConfirm = (props) => {

  const { data, dispatch } = props

  //action 进行品牌查询
  const getPageInfor = (values) => {
    console.log(values)
    dispatch({
      type: 'brand/search',
      payload: {
        brandName: values.brandName,
        status: values.status,
        page: values.page,
        size: values.size,
      },
    });
  };
  //action 进行删除数据
  const deleteAction = (infor) => {
    console.log(infor)
    dispatch({
      type: 'brand/delete',
      payload: {
        key: infor.key
      }
    });
  };

  //页码更改重拿数据
  const reLoadTable = (mes) => {
    //console.log("reload",mes)
    dispatch({
      type: 'brand/load',
      payload: {
        page: mes.page,
        size: mes.size,
      },
    });
  }
  //保存modal数据，新增
  const addBrandInfor = (values) => {
    //console.log(values)
    dispatch({
      type: 'brand/add',
      payload: {
        brandName: values.brandName,
        status: values.status,
        actionPerson: values.actionPerson,
        actionTime: values.actionTime,
      },
    });
  }
  //修改数据
  const changeBrandInfor = (mes) => {
    console.log(mes)
    dispatch({
      type: 'brand/edit',
      payload: {
        key: mes.key,
        brandName: mes.content.brandName,
        status: mes.content.status,
        actionPerson: mes.content.actionPerson,
        actionTime: mes.content.actionTime,
      },
    });
  }
  return (
    <div >
      <BreadcrumbContent >
        <BrandConfirmChild {...props}
          pageInfor={getPageInfor}
          reLoadTable={reLoadTable}
          deleteAction={deleteAction}
          addInfor={addBrandInfor}
          editInfor={changeBrandInfor}
        />
      </BreadcrumbContent>


    </div>

  );
}

// @ts-ignore
export default connect(({ brand }) => brand)(BrandConfirm);
