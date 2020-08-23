import { useState } from 'react'
import { Table, Space, Popconfirm } from 'antd';
import './index.css'
import BrandForm from '../components/BrandForm'
import AddForm from '../components/BrandModal'


export default (props) => {
  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作人',
      dataIndex: 'actionPerson',
      key: 'actionPerson',
    },
    {
      title: '操作时间',
      dataIndex: 'actionTime',
      key: 'actionTime',
    },
    {
      title: '编辑',
      dataIndex: 'operation',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)} >
            <a>删除</a>
          </Popconfirm>
        </Space>

      ),
    },
  ]

  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(1)       //通过useState来实现页面，页码数据条数的修改
  const [modalVisible, setModalVisible] = useState(false)
  const [record, setRecord] = useState(undefined);

  const { data, deleteAction, pageInfor, reLoadTable, addInfor,editInfor } = props

  //拿到删除的key
  const handleDelete = key => {
    let infor = {
      key: key
    }
    deleteAction(infor)
    //重载数据，默认分页1，5
    let mes = {
      page: 1,
      size: 5
    }
    reload(mes)
  };

  //拿到table数据进行编辑
  const handleEdit = record => {
    setModalVisible(true);
    setRecord(record);
  }

  //pagesize，改变调用reload
  const pageSizeHandler = (current, size) => {
    setPageSize(size)
    let mes = {
      page: current,
      size: size
    }
    reload(mes)
  }
  //page，改变调用reload  
  const pageHandler = (current, size) => {
    setPage(current)
    let mes = {
      page: current,
      size: size
    }
    reload(mes)
  }

  //来自brandForm的值
  const getBrandInfor = (values) => {
    values.page = page
    values.size = pageSize
    pageInfor(values)                 //调用父组件方法传给index
  };

  const reload = (mes) => {               //调用父组件方法，根据page，size进行加载
    reLoadTable(mes)
  }

  //控制modal的显示
  const closeHandler = () => {
    setModalVisible(false)
  }

  //Modal表单的提交
  const onFinish = async (values) => {
    setModalVisible(false)
    let key = 0;
    
    if (record) {
      key = record.key;
    }

    if (key) {
      let mes={
        key:key,
        content:values
      }
      editInfor(mes); //修改操作
    } else {
      addInfor(values);   //新增操作
    }
  };
  //分页
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: () => `共${30}条`,         //后端直接给total，需要修改
    pageSizeOptions: [5, 10, 20, 50, 100],
    pageSize: pageSize,
    current: page,
    total: data.totalPage,
    onShowSizeChange: pageSizeHandler,
    onChange: pageHandler,
  };

  return (
    <div>
      <BrandForm
        search={getBrandInfor}
        add={handleEdit}
      />
      <div className="brand-table">
        <Table
          dataSource={data.content}
          columns={columns}
          // @ts-ignore
          pagination={paginationProps}
        >

        </Table>
        <AddForm
          visible={modalVisible}
          closeHandler={closeHandler}
          record={record}
          onFinish={onFinish}
        />
      </div>
    </div>

  )
}

