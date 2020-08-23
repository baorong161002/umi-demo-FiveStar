import React, { Component } from 'react';
import { connect } from 'dva';
import BreadcrumbContent from '../../components/breadContent'
import SearchForm from './components/SearchForm'
import AttTable from './components/AttrTable'
import './index.css'

const CommAttr = (props) => {
  const { data, dispatch } = props

  const searchAttr = (values) => {
    dispatch({
      type: 'commAttr/searchAttr',
      payload: {
        mes: values
      },
    });
  }
  return (
    <div >
      <BreadcrumbContent>
        <div className="searchHeader"><h1>查询条件</h1></div>
        <div className="searchBody">
          <SearchForm search={searchAttr} {...props} />
        </div>
        <AttTable  {...props} />
      </BreadcrumbContent>
    </div>

  );
}

// @ts-ignore
export default connect(({ commAttr }) => commAttr)(CommAttr);