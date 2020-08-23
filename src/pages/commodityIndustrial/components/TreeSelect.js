import React from 'react';
import { Tree,Input } from 'antd';


export default (props) => {
  const { treeData, dispatch } = props
  function onLoadData({ key, children }) {
    return new Promise(resolve => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        dispatch({
          type: 'commIndu/treeSelect',
          payload: {
            key:key,
          },
        });
        resolve();
      }, 1000);
    });
  }
const selectedKeys=(selectedKeys)=>{

  dispatch({
    type: 'commIndu/load',
    payload: {
      key:selectedKeys[0],
    },
  });
}
  return (
    <>
    <Input.Search 
    placeholder="分类名称" 
    onSearch={value => console.log(value)}  
    size="small"
    enterButton 
    />
    <Tree loadData={onLoadData} treeData={treeData} onSelect={selectedKeys}  />
    </>
  )
  ;
};






