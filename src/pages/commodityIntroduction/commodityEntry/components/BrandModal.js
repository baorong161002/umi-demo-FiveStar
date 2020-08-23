import { Modal } from 'antd';
import { Form, Input, Table, Button, Row, Col } from 'antd';

export default props => {
  const {
    brandVisible,
    brandData,
    dispatch,
    selectedBrand,
    chooseTable,
  } = props;

  const formRef = React.createRef();
  //品牌表
  const columns = [
    {
      title: '品牌编码',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: '创建时间',
      dataIndex: 'actionTime',
      key: 'actionTime',
    },
  ];
  const onFinish = values => {
    console.log('Finish:', values);
  };
  //重置方法，数据为空自动页面刷新，不为空表单刷新
  const onReset = () => {
    formRef.current.resetFields();
  };
  const handleCancel = () => {
    dispatch({
      type: 'commodity/updateState',
      payload: {
        brandVisible: false,
        selectedBrandName: '',
      },
    });
  };
  const handleOk = () => {
    dispatch({
      type: 'commodity/updateState',
      payload: {
        brandVisible: false,
      },
    });
  };
  let key = [...selectedBrand];

  const rowSelection = {
    selectedRowKeys: key,
    onSelect: record => {
      key.splice(0, 1, record.key);
      let mes;
      chooseTable(
        (mes = {
          key: key,
          brandName: record,
        }),
      );
    },

    getCheckboxProps: record => ({
      disabled: record.name === '',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Modal
      title="品牌"
      visible={brandVisible}
      width="650px"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        ref={formRef}
        name="bramdFormModal"
        layout="inline"
        onFinish={onFinish}
        style={{ marginLeft: '10px' }}
      >
        <Form.Item name="key" label="品牌编码:">
          <Input style={{ width: 120 }} />
        </Form.Item>
        <Form.Item name="brandName" label="品牌名称:">
          <Input style={{ width: 120 }} />
        </Form.Item>
        <Row justify="end">
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit" shape="round">
                查询
              </Button>
            )}
          </Form.Item>
          <Form.Item>
            <Button shape="round" onClick={onReset}>
              {' '}
              重置
            </Button>
          </Form.Item>
        </Row>
      </Form>
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        rowKey="key"
        columns={columns}
        dataSource={brandData.content}
        size="small"
        style={{ marginTop: '10px' }}
        scroll={{ y: 160 }}
      ></Table>
    </Modal>
  );
};
