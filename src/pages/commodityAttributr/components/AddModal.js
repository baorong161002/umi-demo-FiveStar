import React from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import { Radio, Button } from 'antd';
import EditableTable from './AttrChoose'
import InputButton from '../../../components/inputButton'


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const { Option } = Select;
class AddModal extends React.Component {

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

    //新增编辑表弹窗的ok按钮
    handleOk = e => {
        let { formDialog } = this
        formDialog.validateFields().then(infor => {
            this.props.editTable(infor)
        }
        )

    };
    //新增编辑表弹窗的取消按钮
    handleCancel = e => {
        let { formDialog } = this
        this.props.handleCancel(false)
        formDialog.resetFields();
    };
    //属性值弹框ok
    childHandleOk = e => {

        this.props.changeValueList(false)
    };
    //属性值弹框取消
    childHandleCancel = e => {
        this.props.cancelValueList(false)
    };

    //form-提交
    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    //...按钮
    change = () => {
        let { formDialog } = this
        const infor = formDialog.getFieldsValue()
        const { inputType } = infor
        if (inputType == 1 || inputType == 2) {
            this.props.changeChildVisible(true)
        } else {
            message.warning('请选择单选或者复选编辑类型')
        }

    }

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
                        name="new"
                        {...formItemLayout}
                        onFinish={this.onFinish}
                        ref={(formDialog) => { this.formDialog = formDialog }}
                        initialValues={
                            this.props.record
                        }

                    >
                        <Form.Item label="编码" name="id">
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入属性名称',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="unit"
                            label="单位"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="saleSupport"
                            label="是否销售属性"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择销售属性',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>

                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="searchSupport"
                            label="是否可搜索"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择是否可搜索',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="inputType"
                            label="编辑类型"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择编辑类型',
                                },
                                // { validator: this.handleChange.bind(this) }
                            ]}
                        >
                            <Select  >
                                <Option value={0}>文本输入框</Option>
                                <Option value={1}>单选下拉</Option>
                                <Option value={2}>复选框</Option>
                                <Option value={3}>时间控件</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="nullable"
                            label="是否可为空"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择是否可为空',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item noStyle >
                            <Form.Item
                                name="valueList"
                                label="可选值"
                            >
                                <InputButton name="valueList" onClick={this.change} {...this.props} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="属性描述"
                        >
                            <Input />
                        </Form.Item>
                    </Form>

                </Modal>

                <Modal
                    title="属性可选值"
                    visible={this.props.childVisible}
                    onOk={this.childHandleOk}
                    onCancel={this.childHandleCancel}

                >
                    <EditableTable {...this.props} />

                </Modal>
            </div>
        );
    }
}

export default AddModal