import React, { useEffect, FC } from 'react';
import { Modal, Button, Form, Input, message, DatePicker, Switch } from 'antd';
import moment from 'moment';



const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const UserModal = props => {
  const [form] = Form.useForm();
  const { visible, record, closeHandler, onFinish, confirmLoading } = props;

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        ...record,
        create_time: moment(record.create_time),
        status: Boolean(record.status),
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
    <div>
      <Modal
        title={record ? 'Edit ID: ' + record.id : 'Add'}
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            status: true,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Create Time" name="create_time">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;