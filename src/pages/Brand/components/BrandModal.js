import React, { useState, useEffect } from 'react';
import { Modal, message, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';
const { Option } = Select;

const UserModal = props => {
  const [form] = Form.useForm();
  const { visible, record, closeHandler, onFinish } = props;

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        actionTime: new Date(),
        status: record.status,
      });
    }
  }, [visible]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <>
      <Modal
        title={record ? '编辑ID: ' + record.key : '添加'}
        visible={visible}
        onCancel={closeHandler}
        onOk={onOk}
        forceRender
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <Select placeholder="请选择" defaultValue={status} style={{ width: 120 }}>
              <Option value="1">待确认</Option>
              <Option value="2">成功</Option>
              <Option value="3">失败</Option>
              <Option value="4">取消</Option>
            </Select>
          </Form.Item>
          <Form.Item label="操作人" name="actionPerson" >
            <Input style={{ width: 120 }} />
          </Form.Item>
          <Form.Item label="操作时间" name="actionTime">
            <Input style={{ width: 120 }} />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}

export default UserModal

