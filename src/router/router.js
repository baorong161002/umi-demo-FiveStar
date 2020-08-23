import React from 'react'
import {
    HomeOutlined,
    HighlightOutlined,
    UnderlineOutlined,
    AppstoreOutlined,
    EditOutlined,

} from '@ant-design/icons';

const menuData = [
    {
        path: '/',
        title: '首页',
        code:"1",
        icon: <HomeOutlined />
    },
    {
        path: '/brand',
        title: '商品管理',
        code:"2",
        icon: <UnderlineOutlined />,
        children: [{
            path: '/brand/confirm',
            title: '品牌确认',
            code:"2.1",
            icon: <EditOutlined />,
        },
        {
            path: '/brand/attributr',
            title: '商品属性管理',
            code:"2.2",
            icon: <EditOutlined />,
        },
        {
            path: '/brand/industrial',
            title: '工业分类属性模板',
            code:"2.3",
            icon: <EditOutlined />,
        },
        {
            path: '/brand/introduction',
            title: '商品引进及图参收集',
            code:"2.4",
            icon: <EditOutlined />,
        },
  
        ]
    },
        {
        path: '/demo',
        title: '测试Demo',
        code:"3",
        icon: <AppstoreOutlined />,
        children: [
            {
                path: '/demo/list',
                title: '列表',
                code:"3.1",
                icon: <EditOutlined />,
                children: [{
                    path: '/brand/confirm/test',
                    title: 'test',
                    code:"2.1.1",
                    icon: <EditOutlined />
                }],
            },
            {
                path: '/demo/count',
                title: '计算器',
                code:"3.2",
                icon: <HighlightOutlined />
            },
            {
                path: '/demo/form',
                title: '表格',
                code:"3.3",
                icon: <HighlightOutlined />
            },

        ]
    },
 
    // {
    //     path: '/b',
    //     title: '商品管理',
    //     icon: <AppstoreOutlined />,
    //     children: [
    //         {
    //             path: '/b',
    //             title: '商品维护',
    //             icon: <EditOutlined />
    //         },
    //         {
    //             path: '/b',
    //             title: '商品属性管理',
    //             icon: <HighlightOutlined />
    //         },

    //     ]
    // },

]


export default menuData;    