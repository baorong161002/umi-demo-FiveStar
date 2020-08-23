import React from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';



const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

class GroupModal extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        let { formDialog } = this
        if (formDialog) {
            formDialog.setFieldsValue(this.props.record)
        } else {
            //         formDialog.resetFields(undefined)
        }
    }

    //属性组编辑新增弹框ok按钮
    handleOk = e => {
        let { formDialog } = this
        formDialog.validateFields().then(infor => {
            this.props.editTable(infor)
        }
        )
    };

    handleCancel = e => {
        //this.formRef.current.resetFields(undefined);
        this.props.changeVisible(false)

    };


    //form-提交
    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    render() {

        return (
            <div>

                <Modal
                    title="编辑或者新增属性"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        name="Group"
                        {...formItemLayout}
                        onFinish={this.onFinish}
                        ref={(formDialog) => { this.formDialog = formDialog }}
                        initialValues={
                            this.props.record
                        }

                    >
                        <Form.Item label="属性组编码" name="id">
                            <span>{this.props.record.id}</span>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="属性组名称名称"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入属性组名称',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="sequence"
                            label="顺序号"
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default GroupModal