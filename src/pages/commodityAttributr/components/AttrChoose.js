import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Space } from 'antd';
import Mock from 'mockjs'


export default (props) =>{

    const{editingKey,dataAttrValue,dispatch}=props
    const isEditing = record => record.key === editingKey;
    const formDialog=React.createRef()
    //将数据写入
     const edit = record => {
        formDialog.current.setFieldsValue({
            key: '',
            name: '',
            order: '',
            ...record,
        });
        dispatch({
            type: 'commAttr/changeState',
            payload: {
                editingKey: record.key
            },
        });
    };

    //取消将编辑key写空
    const cancel = () => {
        dispatch({
            type: 'commAttr/changeState',
            payload: {
                editingKey: ''
            },
        });
    };

    //进行保存操作，修改data的数据
    const save = async key => {
        try {
            const row = await formDialog.current.validateFields();
            const newData = [...dataAttrValue];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                dispatch({
                    type: 'commAttr/changeState',
                    payload: {
                        editingKey: '',
                        dataAttrValue:newData
                    },
                });
            } else {
                newData.push(row);
                dispatch({
                    type: 'commAttr/changeState',
                    payload: {
                        editingKey: '',
                        dataAttrValue:newData
                    },
                });
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    //新增
    const handleAdd = () => {
        const { order, dataAttrValue } = props;
        const newData = {
            key: Mock.Random.id(),
            name: "新属性值",
            order: order
        };
        dispatch({
            type: 'commAttr/changeState',
            payload: {
                dataAttrValue: [...dataAttrValue, newData],
                order: order + 1
            },
        });
    };

    //删除
    const dele = async key => {
        try {
            const newData = [...dataAttrValue];

            newData.forEach(item => {
                if (item.key == key) {
                    const de = item
                    for (let i = 0, l = newData.length; i < l; i++) {
                        if (newData[i] === de) {
                            newData.splice(i, 1);
                            i--;
                        }
                    }
                }
            });
            dispatch({
                type: 'commAttr/changeState',
                payload: {
                    editingKey: '',
                    dataAttrValue:newData
                },
            });

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


        //rule
        const EditableCell = ({
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        }) => {
            const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
            return (
                <td {...restProps}>
                    {editing ? (
                        <Form.Item
                            name={dataIndex}
                            style={{
                                margin: 0,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ]}
                        >
                            {inputNode}
                        </Form.Item>
                    ) : (
                            children
                        )}
                </td>
            );
        };

        //表格列
        const columns = [
            {
                title: '属性值编码',
                dataIndex: 'key',
                width: '20%',
            },
            {
                title: '属性值',
                dataIndex: 'name',
                width: '30%',
                editable: true,
            },
            {
                title: '排序',
                dataIndex: 'order',
                width: '20%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (_, record) => {
                    const editable = isEditing(record);
                    return editable ? (
                        <span>
                            <a
                                href="javascript:;"
                                onClick={() => save(record.key)}
                                style={{
                                    marginRight: 8,
                                }}
                            >
                                保存
                    </a>
                            <Popconfirm title="确定取消吗?" onConfirm={cancel}>
                                <a>取消</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <Space size="middle">

                                <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    编辑
                            </a>
                                <Popconfirm title="确定删除吗?" onConfirm={() => dele(record.key)}>
                                    <a disabled={editingKey !== ''} >
                                        删除
                            </a>
                                </Popconfirm>
                            </Space>
                        );
                },
            },
        ];

        //处理表格列
        const mergedColumns = columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });

        return (
            <div>
                <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    新增
                </Button>
                <Form 
                ref={formDialog} 
                component={false}
                >
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        size={"small"}
                        dataSource={dataAttrValue}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                    />
                </Form>
            </div>

        );
    }

