import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import "./menu.less"
import menuData from "../router/router"
import { Menu } from 'antd';
const { SubMenu } = Menu;

export default class Menus extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = ee => {
        const { key, keyPath } = ee;
        const des = this.creatBreadCrumb(keyPath)
        this.props.changeBreadName(des)
    };
    creatBreadCrumb(keyPath) {
        let arr = keyPath.map((v, i) => {
            return this.parseJson(menuData, "code", v)
        })
        var arrTitle = []
        for (let i = 0; i < arr.length; i++) {
            arrTitle[i] = arr[i][0].title

        }
        arrTitle.reverse();
        return arrTitle.join('-->');
    }
    parseJson(jsonObj, key, value) {
        // 循环所有键
        let array = []
        for (let v in jsonObj) {
            let element = jsonObj[v]
            // 判断是对象或者数组
            if (typeof (element) == 'object') {
                let result = this.parseJson(element, key, value)
                if (result.length) {
                    array = array.concat(result)
                }
            } else {
                if (v == key) {
                    if (element == value) {
                        array.push(jsonObj)
                    }
                }
            }
        }
        return array
    }
    createMentItem(menu) {
        return menu.map(item => {
            if (item.children) {
                return <SubMenu key={item.code} title={item.title}>
                    {this.createMentItem(item.children)}
                </SubMenu>
            } else {
                return (
                    <Menu.Item key={item.code}>
                        <Link to={item.path}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }

    render() {
        return (
            <Menu
                mode="inline"
                style={{ width: 200 }}
                onClick={this.handleClick}
            >
                {this.createMentItem(menuData)}

            </Menu>
        )
    }
}