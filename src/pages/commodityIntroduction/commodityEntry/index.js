import React from 'react';
import { connect } from 'dva';
import BreadcrumbContent from '../../../components/breadContent';
import EntryForm from './components/EntryForm';
import BrandModal from './components/BrandModal';
import IndustryModal from './components/IndustryModal';

const Hello = props => {
  const { dispatch } = props;
  const getInfor = values => {
    dispatch({
      type: 'commodity/load',
      payload: {
        brandVisible: values,
        page: 1,
        size: 10,
      },
    });
  };
  //点击事件，发送请求获取树结构
  const getTreeData = values => {
    dispatch({
      type: 'commodity/updateState',
      payload: {
        industrialVisible: values,
      },
    });
  };
  const chooseTable = values => {
    const { key, brandName } = values;
    dispatch({
      type: 'commodity/updateState',
      payload: {
        selectedBrand: key,
        selectedBrandName: brandName,
      },
    });
  };
  return (
    <BreadcrumbContent>
      <EntryForm {...props} getInfor={getInfor} getTreeData={getTreeData} />
      <BrandModal {...props} chooseTable={chooseTable} />
      <IndustryModal {...props}></IndustryModal>
    </BreadcrumbContent>
  );
};

export default connect(({ commodity }) => commodity)(Hello);
