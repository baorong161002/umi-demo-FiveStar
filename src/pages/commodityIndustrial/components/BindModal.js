import React from 'react';
import { Modal, Form, Input, Button, Row, Col, Table, Space } from 'antd';

export default props => {
  const {
    changeBindVisible,
    bindVisible,
    allAttrdata,
    selectedkeys,
    chooseTable,
    saveBindRecord,
  } = props;

  //属性表
  const columns = [
    {
      title: '属性编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '属性名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '是否销售属性',
      dataIndex: 'saleSupport',
      key: 'saleSupport',
      render: (text, record) => (
        <Space key={record.id}>{text ? '是' : '否'}</Space>
      ),
    },
  ];

  let keys = [...selectedkeys];

  //用来显示属性值选择按钮，已选择的通过model去实现绑定，清除

  const rowSelection = {
    selectedRowKeys: keys,
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      if (selected) {
        keys.push(record.id);
      } else {
        console.log('1111');
        keys.pop(record.id);
      }
      chooseTable(keys);
    },

    // getCheckboxProps: record => ({
    //     disabled: record.name === '',
    //     // Column configuration not to be checked
    //     name: record.name,
    // }),
  };
  //绑定弹框按钮ok，需要发送post请求
  const handleOk = e => {
    saveBindRecord(false);
  };
  //绑定弹框取消按钮
  const handleCancel = e => {
    changeBindVisible(false);
  };
  //form-提交
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <div>
      <Modal
        title="编辑或者新增属性"
        visible={bindVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="600px"
      >
        <Form
          name="BindAttributr"
          onFinish={onFinish}
          //ref={(formDialog) => { this.formDialog = formDialog }}
        >
          <Row>
            <Col span={8}>
              <Form.Item label="属性编码" name="id" key="id">
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="属性名称"
                name="name"
                style={{ marginLeft: '20px' }}
                key="id"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item key="id">
                <Button
                  size="middle"
                  type="primary"
                  style={{ marginLeft: '20px' }}
                >
                  {' '}
                  查询
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          rowKey="id"
          columns={columns}
          dataSource={allAttrdata.content}
          size="small"
          scroll={{ y: 160 }}
        />
      </Modal>
    </div>
  );
};
