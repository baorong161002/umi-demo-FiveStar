import React, {Component} from 'react';
import { connect } from 'dva';
import CountComponent from './components/CountComponent'
import BreadcrumbContent from '../../components/breadContent'

const Counter = (props) => {

    const {numberValue,dispatch} = props

    function changeDisplay (display){
      dispatch({type: 'counter/updateState', payload: {numberValue: display}})
    }
    
    return (
      <div>
        <BreadcrumbContent>
        <CountComponent {...props} changeDisplay={changeDisplay}/> 
          </BreadcrumbContent>
    
      {/* 向子组件传入props */}
      </div>

    );
  }

// @ts-ignore
export default connect(({ counter }) => counter)(Counter);  //解构不引入新的变量
