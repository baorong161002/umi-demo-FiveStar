import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
const { Option } = Select;
import './index.css'

const initialValues = {
    available: true,
    from: 1
}

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props)
    }

    formRef = React.createRef();

    onFinish = values => {
        this.props.search(values)
    };

    //重置方法，数据为空自动页面刷新，不为空表单刷新
    onReset = () => {
        this.formRef.current.resetFields();

    };


    render() {
        return (
            <div className="commodity-context" >
                <Form ref={this.formRef} name="SearchForm" onFinish={this.onFinish} initialValues={initialValues}>
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                name="id"
                                label="属性编码:"
                            >
                                <Input style={{ width: "120px" }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="attrName"
                                label="属性名称:"
                            >
                                <Input style={{ width: "120px" }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="available"
                                label="是否作废:"
                            >
                                <Select style={{ width: "120px" }}>
                                    <Option value={true}>否</Option>
                                    <Option value={false}>是</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="from"
                                label="系统来源:"
                            >
                                <Select style={{ width: "120px" }}>
                                    <Option value={1}>五星</Option>
                                    <Option value={-1}>京东</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Col span={2} >
                            <Form.Item >
                                <Button type="primary"
                                    htmlType="submit"
                                    shape="round"
                                >
                                    查询
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={2} >
                            <Form.Item >
                                <Button shape="round"
                                    onClick={this.onReset}> 重置</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>




            </div>
        )
    }

}