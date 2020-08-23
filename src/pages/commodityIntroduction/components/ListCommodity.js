import { Table, Space, Popconfirm, Divider } from 'antd';

export default props => {
  const columns = [
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'left',
      width: 220,
      render: (text, record) => (
        <Space size="small" style={{ fontSize: 14 }}>
          <a>编辑</a>
          <a style={{ color: 'green' }}>查看</a>
          <Popconfirm title="Sure to delete?">
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
          <a style={{ color: 'red' }}>明细信息</a>
          <Popconfirm title="复制本条SPU?">
            <a>复制</a>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'SPU编码',
      dataIndex: 'spuId',
      key: 'spuId',
      width: 150,
    },
    {
      title: '工业分类',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: '工业分类编码',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 120,
    },
    {
      title: '品牌',
      dataIndex: 'address',
      key: '4',
      width: 100,
    },
    {
      title: '商品名称',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: 'SPU状态',
      dataIndex: 'address',
      key: '6',
      width: 120,
    },
    {
      title: '商品型号',
      dataIndex: 'address',
      key: '7',
      width: 120,
    },
    {
      title: '经营部门',
      dataIndex: 'address',
      key: '8',
      width: 120,
    },
    {
      title: '商品描述',
      dataIndex: 'address',
      key: '8',
      width: 120,
    },
    {
      title: '创建人',
      dataIndex: 'address',
      key: '8',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'address',
      key: '8',
      width: 120,
    },
    {
      title: '修改人',
      dataIndex: 'address',
      key: '8',
      width: 120,
    },
    {
      title: '修改时间',
      dataIndex: 'address',
      key: '8',
      width: 120,
    },
  ];
  const data = [
    {
      address: 0,
    },
    {
      address: 0,
    },
    {
      address: 0,
    },
    {
      address: 0,
    },
    {
      address: 0,
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      scroll={{ x: 2000, y: 300 }}
      bordered={true}
    />
  );
};
