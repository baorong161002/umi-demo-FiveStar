import { Modal } from 'antd';
import { Tree, Input } from 'antd';

export default props => {
  const { industrialVisible, dispatch } = props;

  //树结构
  const treeData = [
    {
      title: '空调',
      key: '0',
      children: [
        {
          title: '家用空调',
          key: '0-0',
          children: [
            {
              title: '挂机',
              key: '0-0-0',
            },
            {
              title: '柜机',
              key: '0-0-1',
            },
            {
              title: '吸顶机',
              key: '0-0-2',
            },
          ],
        },
        {
          title: '商用空调',
          key: '0-1',
        },
        {
          title: '空调配件',
          key: '0-2',
        },
      ],
    },
    {
      title: '冰洗',
      key: '1',
    },
    {
      title: '影视',
      key: '2',
    },
    {
      title: '厨卫',
      key: '3',
    },
    {
      title: '小家电',
      key: '4',
    },
    {
      title: '家居',
      key: '5',
    },
  ];

  const handleCancel = () => {
    dispatch({
      type: 'commodity/updateState',
      payload: {
        industrialVisible: false,
        selectedCategoryName: {},
      },
    });
  };

  const handleOk = () => {
    dispatch({
      type: 'commodity/editForm',
      payload: {
        industrialVisible: false,
      },
    });
  };

  //树选择事件
  const selectedKeys = (selectedKeys, e) => {
    if (e.selected == true) {
      const categoryName = e.selectedNodes[0];
      dispatch({
        type: 'commodity/updateState',
        payload: {
          selectedCategoryName: categoryName,
        },
      });
    } else {
    }
  };

  return (
    <Modal
      title="工业分类: 选择分类时，请选择末级分类"
      visible={industrialVisible}
      width="360px"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <span style={{ fontSize: '13px' }}>
        如工业分类无法选择，请联系系统管理员开通权限！
      </span>
      <Input.Search
        placeholder="分类名称"
        onSearch={value => console.log(value)}
        enterButton
      />
      <Tree treeData={treeData} height={233} onSelect={selectedKeys} />
    </Modal>
  );
};
