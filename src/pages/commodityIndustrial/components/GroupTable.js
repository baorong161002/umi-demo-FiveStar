import { Table, Space, Popconfirm, Collapse, Button } from 'antd';
import GroupModal from '../components/GroupModal';
import BindModal from '../components/BindModal';
import PreviewModal from './PreviewModal';

export default props => {
  const { record, dispatch, visible, getGroupDetail } = props;
  const { bindVisible, groupAttrData, categoryName, attrdata } = props;
  const { content } = groupAttrData;
  const columns = [
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a
            onClick={e => {
              e.stopPropagation();
              handleBind(record);
            }}
          >
            绑定属性
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: '属性组编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '属性组名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '顺序号',
      key: 'sequence',
      dataIndex: 'sequence',
    },
  ];
  //属性值详情表
  const columnsAttr = [
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
    {
      title: '是否可为空',
      dataIndex: 'nullable',
      key: 'nullable',
      render: (text, record) => (
        <Space key={record.id}>{text ? '是' : '否'}</Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];
  const { Panel } = Collapse;

  function callback(key) {
    //console.log(key);
  }
  //属性组删除
  const handleDelete = value => {
    dispatch({
      type: 'commIndu/deleteGroup',
      payload: {
        id: value,
      },
    });
  };

  //添加方法，先把models里的record清空
  const onAdd = () => {
    dispatch({
      type: 'commIndu/changeState',
      payload: {
        visible: true,
        record: {
          id: '',
          name: '',
          sequence: '',
        },
      },
    });
  };
  //点击预览
  const onPreview = () => {
    dispatch({
      type: 'commIndu/changeState',
      payload: {
        previewVisible: true,
      },
    });
  };
  //取消预览
  const changePreviewVisible = () => {
    dispatch({
      type: 'commIndu/changeState',
      payload: {
        previewVisible: false,
      },
    });
  };
  //改变visible的值
  const changeVisible = value => {
    dispatch({
      type: 'commIndu/changeState',
      payload: {
        visible: value,
      },
    });
  };
  //获取勾选绑定属性
  const chooseBindRecord = value => {
    console.log(value);
    dispatch({
      type: 'commIndu/changeState',
      payload: {
        selectedkeys: value,
      },
    });
  };
  //发送绑定属性请求
  const saveBindRecord = value => {
    dispatch({
      type: 'commIndu/saveBindRecord',
      payload: {
        bindVisible: value,
      },
    });
  };
  //改变bindvisible的值,
  const changeBindVisible = value => {
    dispatch({
      type: 'commIndu/changeState',
      payload: {
        bindVisible: value,
        //selectedRowKeys: []
      },
    });
  };

  //拿到table数据进行编辑
  const handleEdit = record => {
    dispatch({
      type: 'commIndu/changeState',
      payload: {
        visible: true,
        record: record,
      },
    });
  };

  //拿到table数据进行绑定属性
  const handleBind = record => {
    dispatch({
      type: 'commIndu/getAllAttrByGroupIdSort',
      payload: {
        bindVisible: true,
        record: record,
      },
    });
  };

  //编辑新增完成后传输dialog数据
  const editRecord = infor => {
    dispatch({
      type: 'commIndu/editOraddRecord',
      payload: {
        visible: false,
        record: infor,
      },
    });
  };

  //属性组表格和属性详情表格的联动
  const click = record => {
    getGroupDetail(record);
  };

  return (
    <div className="GroupMain">
      <div className="commodityHeader">
        <Button style={{ float: 'right' }} size="middle" onClick={onAdd}>
          {' '}
          新增
        </Button>
        <Button
          style={{ float: 'right', marginRight: '10px' }}
          size="middle"
          onClick={onPreview}
        >
          {' '}
          预览
        </Button>
        <p style={{ width: '100px' }}>{categoryName}属性组</p>onPreview
      </div>

      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={content}
        bordered={true}
        onRow={(record, rowkey) => {
          return {
            //点击行 record 指的本行的数据内容，rowkey指的是本行的索引
            onClick: () => {
              click(record);
            },
          };
        }}
      />
      <GroupModal
        visible={visible}
        changeVisible={changeVisible}
        editTable={editRecord}
        {...props}
      />
      <BindModal
        visible={bindVisible}
        changeBindVisible={changeBindVisible}
        chooseTable={chooseBindRecord}
        saveBindRecord={saveBindRecord}
        {...props}
      />
      <PreviewModal changePreviewVisible={changePreviewVisible} {...props} />
      {record.id === 0 ? null : (
        <Collapse defaultActiveKey="1" onChange={callback}>
          <Panel header={record.name + '属性组属性详情'} key="1">
            <Table
              rowKey={'id'}
              columns={columnsAttr}
              dataSource={attrdata.content}
              bordered={true}
              size="small"
            />
          </Panel>
        </Collapse>
      )}
    </div>
  );
};
