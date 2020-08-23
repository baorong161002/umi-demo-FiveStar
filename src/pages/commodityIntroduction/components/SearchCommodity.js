import React from 'react';
import { Form, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import './index.css';
const { Option } = Select;

export default props => {
  const formRef = React.createRef();

  const onFinish = values => {};
  const onReset = () => {};
  // form css 样式
  const formLayout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  };
  return (
    <div className="commodity_context">
      <Form
        ref={formRef}
        name="SearchForm"
        onFinish={onFinish}
        size="small"
        {...formLayout}
      >
        <Row>
          <Col span={6}>
            <Form.Item name="a" label="品牌:">
              <Input style={{ width: '120px' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="b" label="工业分类:">
              <Input style={{ width: '120px' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="1" label="spu编码:">
              <Input style={{ width: '120px' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="2" label="spu名称:">
              <Input style={{ width: '120px' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="a" label="商品型号:">
              <Input style={{ width: '120px' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="b" label="sku编码:">
              <Input style={{ width: '120px' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="1" label="sku状态:">
              <Input style={{ width: '120px' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="2" label="开始日期:">
              <DatePicker style={{ width: '120px' }}></DatePicker>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="a" label="结束日期:">
              <DatePicker style={{ width: '120px' }}></DatePicker>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="b" label="经营部门:">
              <Input style={{ width: '120px' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col span={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit" shape="round">
                查询
              </Button>
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item>
              <Button shape="round" onClick={onReset}>
                {' '}
                重置
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
