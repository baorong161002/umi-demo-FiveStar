
import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menuData from "../router/router"

const breadcrumbNameMap = {
  '/demo/list': '列表',
  '/demo/count': '计算器',
  '/brand/confirm': '品牌确认',
  '/brand': '京东商品管理',
  '/demo': '测试Demo',
  '/demo/form': '表格'
};

const BreadcrumbCustom = withRouter((props) => {

  const { location } = props;
  const url = location.pathname;
  let urlArr = url.substr(1).split("/");
  const firstUrl = "/" + urlArr[0]
  let isIndex = false;
  if (url === '/') {
    isIndex = true;
  }
  const nameItem = breadcrumbNameMap[url]
  const firstItem = breadcrumbNameMap[firstUrl]
  const breadcrumbItems = [(
    <Breadcrumb.Item key={firstUrl}>
      <Link to={firstUrl}>{firstItem}</Link>
    </Breadcrumb.Item>
  ), (<Breadcrumb.Item key={url}>
    <Link to={url}>
      {nameItem}
    </Link>
  </Breadcrumb.Item>)]
  return (
    isIndex ? null :
      <div className="breadcrumb-content">
        <Breadcrumb>
          {breadcrumbItems}
        </Breadcrumb>
      </div>
  )

})

export default BreadcrumbCustom

