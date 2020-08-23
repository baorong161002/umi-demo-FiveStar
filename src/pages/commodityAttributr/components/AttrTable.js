import { Table, Space, Popconfirm, Button, Modal } from 'antd';
import './index.css';
import AddModal from '../components/AddModal';

export default props => {
  const {
    record,
    data,
    dispatch,
    visible,
    childVisible,
    appClassVisible,
  } = props;
  //应用分类表格列配置描述
  const appClassColumns = [
    {
      title: '属性组编码',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
    },
    {
      title: '属性组名称',
      dataIndex: 'age',
      key: 'age',
      width: '25%',
    },
    {
      title: '工业分类编码',
      dataIndex: 'address',
      key: 'address',
      width: '20%',
    },
    {
      title: '工业分类名称',
      dataIndex: 'address',
      key: 'address',
      width: '20%',
    },
    {
      title: '父级工业分类名称',
      dataIndex: 'address',
      key: 'address',
      width: '25%',
    },
  ];

  const columns = [
    {
      title: '编辑',
      dataIndex: 'operation',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a style={{ color: 'red' }}>作废</a>
          </Popconfirm>
          <a style={{ color: 'red' }} onClick={() => handleClassApp()}>
            应用分类
          </a>
        </Space>
      ),
    },
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
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '是否销售属性',
      dataIndex: 'saleSupport',
      key: 'saleSupport',
      render: (text, record) => (
        <Space key={record.id}>{text ? '是' : '否'}</Space>
      ),
    },
    {
      title: '是否可为空',
      dataIndex: 'nullable',
      key: 'nullable',
      render: (text, record) => (
        <Space key={record.id}>{text ? '是' : '否'}</Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '是否可搜索',
      dataIndex: 'searchSupport',
      key: 'searchSupport',
      render: (text, record) => (
        <Space key={record.id}>{text ? '是' : '否'}</Space>
      ),
    },

    {
      title: '作废',
      dataIndex: 'available',
      key: 'available',
      render: (text, record) => (
        <Space key={record.id}>{text ? '否' : '是'}</Space>
      ),
    },
  ];

  //添加方法，先把models里的record清空
  const onAdd = () => {
    dispatch({
      type: 'commAttr/changeState',
      payload: {
        visible: true,
        record: {
          id: null,
          name: '',
          unit: '',
          inputType: 0,
          description: '',
          nullable: '',
          saleSupport: '',
          searchSupport: '',
          valueList: [],
        },
        dataAttrValue: [],
      },
    });
  };
  const handleDelete = value => {
    console.log(value);
  };
  //改变visible的值
  const changeVisible = value => {
    dispatch({
      type: 'commAttr/changeState',
      payload: {
        visible: value,
      },
    });
  };
  //改变appClassVisible的值
  const handleClassApp = () => {
    dispatch({
      type: 'commAttr/changeState',
      payload: {
        appClassVisible: true,
      },
    });
  };
  //改变appClassVisible的值
  const appClassChange = () => {
    dispatch({
      type: 'commAttr/changeState',
      payload: {
        appClassVisible: false,
      },
    });
  };
  //拿到table数据进行编辑
  const handleEdit = record => {
    // console.log(record)
    dispatch({
      type: 'commAttr/changeState',
      payload: {
        visible: true,
        record: record,
        dataAttrValue: record.valueList,
      },
    });
  };
  //编辑新增完成后传输dialog数据
  const editRecord = infor => {
    dispatch({
      type: 'commAttr/editOraddRecord',
      payload: {
        visible: false,
        record: infor,
      },
    });
  };
  //点击属性值弹窗的ok按钮
  const changeValueList = value => {
    dispatch({
      type: 'commAttr/changeValueList',
      payload: {
        childVisible: value,
      },
    });
  };
  //属性值弹框取消
  const cancelValueList = value => {
    dispatch({
      type: 'commAttr/cancelValueList',
      payload: {
        childVisible: value,
      },
    });
  };

  //改变childvisible的值
  const changeChildVisible = value => {
    dispatch({
      type: 'commAttr/changeState',
      payload: {
        childVisible: value,
      },
    });
  };
  //属性编辑弹窗取消事件
  const handleCancel = value => {
    dispatch({
      type: 'commAttr/handleCancel',
      payload: {
        visible: value,
      },
    });
  };
  return (
    <div>
      <div className="commodityHeader">
        <Button style={{ float: 'right' }} shape="round" onClick={onAdd}>
          {' '}
          新增
        </Button>
        <p style={{ width: '100px' }}>商品属性</p>
      </div>
      <Table
        rowKey={'id'}
        dataSource={data.content}
        columns={columns}
        style={{ width: '100%' }}
        bordered
      ></Table>
      <AddModal
        visible={visible}
        changeVisible={changeVisible}
        childVisible={childVisible}
        changeChildVisible={changeChildVisible}
        cancelValueList={cancelValueList}
        editTable={editRecord}
        handleCancel={handleCancel}
        changeValueList={changeValueList}
        {...props}
      />
      <Modal
        title="应用分类"
        visible={appClassVisible}
        onOk={appClassChange}
        onCancel={appClassChange}
      >
        <Table size={'small'} columns={appClassColumns} bordered />
      </Modal>
    </div>
  );
};
