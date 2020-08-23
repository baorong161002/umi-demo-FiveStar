import React from 'react';
import { connect } from 'dva';
import BreadcrumbContent from '../../components/breadContent'
import TreeSelect from './components/TreeSelect'
import GroupTable from './components/GroupTable'
import './index.css'

const Hello = (props) => {
    const { data, dispatch,groupAttrData } = props

    //发送属性组编码请求属性组中的属性信息
    const getGroupDetail = (record) => {
        dispatch({
            type: 'commIndu/getGroupDetail',
            payload: {
                record
            },
        });
    }
    return (
        <BreadcrumbContent>
            <div >
                <div className="tree" >
                    <TreeSelect 
                    {...props}
                    />
                </div>

                <div className="table">
                    <GroupTable
                        {...props}
                        getGroupDetail={getGroupDetail}
                    />
                </div>
            </div>

        </BreadcrumbContent>


    );
}

export default connect(({ commIndu }) => commIndu)(Hello)