import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import BreadcrumbContent from '../../components/breadContent';
import SearchCommodity from './components/SearchCommodity';
import ListCommodityTable from './components/ListCommodity';
import './index.css';

const Hello = props => {
  const { data, dispatch } = props;

  return (
    <BreadcrumbContent>
      <div className="addCommodity">
        <Button style={{ float: 'right' }} shape="round">
          <Link to="/commodity/entry">新增</Link>
        </Button>
      </div>
      <div className="SearchCommodity">
        <p style={{ width: '100px' }}>查询条件</p>
      </div>
      <SearchCommodity />
      <div className="Commodity">
        <p style={{ width: '100px' }}>商品列表</p>
      </div>
      <ListCommodityTable />
    </BreadcrumbContent>
  );
};
export default Hello;
//export default connect(({ commIndu }) => commIndu)(Hello)
