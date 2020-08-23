import { Form, Input, Select, Button, Row, Col } from 'antd';
const { Option } = Select;
import './index.css'
import React, { useState, useEffect } from 'react';

export default class Demo extends React.Component {
    constructor(props) {
        super(props)
    }

    formRef = React.createRef();

    onFinish = values => {
        //  console.log('Finish:', values);   
        this.props.search(values);  //调用父组件方法传值

    };

    //重置方法，数据为空自动页面刷新，不为空表单刷新
    onReset = () => {
        if (this.props.data) {
            this.formRef.current.resetFields();
        } else {
            location.reload()
        }

    };

    //点击添加按钮，给父组件
    add = () => {
        this.props.add(undefined)
    }

    render() {
        return (
            <div className="brand-context" >
                <Form
                    ref={this.formRef}
                    name="bramdForm"
                    layout="inline"
                    onFinish={this.onFinish}

                >

                    <Form.Item
                        name="brandName"
                        label="品牌名称:"
                        rules={[{ required: true, message: ' 请输入品牌名称 !' }]}
                    >
                        <Input placeholder="请输入品牌名称" style={{ width: 120 }} />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="状态:"
                        rules={[{ required: true, message: '输入所要查询的状态!' }]}
                    >
                        <Select placeholder="请选择" defaultValue="0">
                            <Option value="0">请选择</Option>
                            <Option value="1">待确认</Option>
                            <Option value="2">成功</Option>
                            <Option value="3">失败</Option>
                            <Option value="4">取消</Option>
                        </Select>
                    </Form.Item>


                    <Row justify="end">
                        <Form.Item shouldUpdate>
                            {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    shape="round"
                                >
                                    查询
                                </Button>
                            )}
                        </Form.Item>
                        <Form.Item >
                            <Button shape="round" onClick={this.onReset}> 重置</Button>
                        </Form.Item>
                        <Form.Item >
                            <Button shape="round" onClick={this.add}> 新增</Button>
                        </Form.Item>
                    </Row>

                </Form>

            </div>
        )
    }

}