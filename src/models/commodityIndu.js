import { getCategoryGroup } from '../services/categoryService'
import { getAttrdata } from '../services/categoryService'
import { getTreeChild } from '../services/categoryService'
import { addorEditAttrGroup } from '../services/categoryService'
import { getAllAttrByGroupIdSort } from '../services/categoryService'

function updateTreeData(list, key, children) {
  return list.map(node => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children) };
    }

    return node;
  });
}

//通过treedata查到工业分类id
const categoryId = (key, items) => {
  let result;
  for (let i in items) {
    let item = items[i];
    if (item.key == key) {
      result = {
        id: item.categoryId,
        title: item.title
      }
        ;
      break;
    } else if (item.children) {
      result = categoryId(key, item.children);
    }
  }
  return result;
}

export default {
  namespace: 'commIndu',
  state: {
    treeData: [
      {
        title: '空调',
        key: '0',
        categoryId: 1
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
    ],
    categoryName: "",
    groupAttrData: [],
    previewData: [],
    attrdata: [
    ],
    allAttrdata: [],
    visible: false,
    bindVisible: false,
    previewVisible: false,
    bindrecord: {},
    selectedkeys:[],
    record: {
      id: 0,
      name: ""
    },

  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    //控制弹窗
    changeState(state, { payload }) {
      console.log("进入models",payload)
      return {
        ...state,
        ...payload
      }
    },

  },
  effects: {
    *load({ payload }, { select, put, call }) {
      const { key } = payload
      const treeData = yield select(({ commIndu }) => commIndu.treeData)
      const mes = categoryId(key, treeData)
      const { id, title } = mes
      const { infor } = yield call(getCategoryGroup, { categoryId: id });
      const dataArr = infor
      const result = { dataArr }
      console.log("加载阶段", result)
      // 调用reducers中的方法
      yield put({
        type: "save",
        payload: {
          groupAttrData: result.dataArr,
          categoryName: title
        }
      });
    },
    //新增或编辑属性组
    *editOraddRecord({ payload }, { select, put, call }) {
      //发送一个put请求，id是否存在由后端进行判断--请求API请求路径：/attribute
      //判断返回的code，成功则对dialog进行关闭
      const { visible, record } = payload
      console.log("models属性组编辑新增", record)
      const { infor } = yield call(addorEditAttrGroup, { record });
      const dataArr = infor
      const result = { dataArr }
      yield put({
        type: "save",
        payload: {
          visible: visible,
          groupAttrData: result.dataArr,
        }
      });
    },
    //属性组详细信息
    *getGroupDetail({ payload }, { select, put, call }) {
      //通过record.id发送请求返回属性组数据 https://baseUrl/getAttrByGroup?id=111
      //将属性id取出存到selectedRowKey
      const { id } = payload.record
      const { infor } = yield call(getAttrdata, { id });
      const dataArr = infor
      const result = { dataArr }
      console.log("加载阶段", result)
      // 调用reducers中的方法
      yield put({
        type: "save",
        payload: {
          record: payload.record,
          attrdata: result.dataArr
        }
      });
    },
    //属性组删除
    *deleteGroup({ payload }, { select, put, call }) {
      // API请求路径：/attrGroup
      const { id } = payload
      console.log("models进行删除操作", id);
    },
    //绑定属性的点击操作
    *editBindRecord({ payload }, { select, put, call }) {

    },
    //绑定属性
    *saveBindRecord({ payload }, { select, put, call }) {
      //API请求路径：/bondAttrToGroup 
      //首先应该通过groupid发送请求，获取排序后的所有属性表,已绑定属性应在前面
      // {
      //   "groupId":1232,
      //   "categoryCode":"223321",
      //   "attributeIds":[
      //     123,321,322
      //   ]
      // }
      const { bindVisible } = payload
      const selectedRows = yield select(({ commIndu }) => commIndu.selectedRows)
      console.log("models绑定属性", selectedRows);
      const attrdata = yield select(({ commIndu }) => commIndu.attrdata)
      //结束后将selectedRowKeys清空，已便于下一个绑定
      attrdata.content = selectedRows
      yield put({
        type: "save",
        payload: {
          bindVisible: bindVisible,
          attrdata: attrdata
        }
      });
    },
    //异步加载tree
    *treeSelect({ payload }, { select, put, call }) {
      const { key } = payload
      console.log("点击tree的key", key);
      const treeData = yield select(({ commIndu }) => commIndu.treeData)
      const { infor } = yield call(getTreeChild, { key });
      const newTree = updateTreeData(treeData, key, infor)
      yield put({
        type: "save",
        payload: { treeData: newTree }
      });
    },
    //根据属性组id获取全部属性，绑定属性在上
    *getAllAttrByGroupIdSort({ payload }, { select, put, call }) {
      //https://baseUrl/getAllAttrByGroupIdSort?id=111&page=213&size=2
      //API请求路径：/getAllAttrByGroupIdSort
      const { record, bindVisible } = payload
      const { id } = record
      const { infor } = yield call(getAllAttrByGroupIdSort, { id });
      const dataArr = infor
      const result = { dataArr }
      const attrdata = yield select(({ commIndu }) => commIndu.attrdata)
      //获取已经绑定的属性
      let selected = [];
      if (attrdata == 0) {
        return null
      } else {
        attrdata.content.forEach(item => {
          if (item.id) {
            selected.push(item.id)
          }
        });
      }
      yield put({
        type: "save",
        payload: {
          allAttrdata: result.dataArr,
          bindVisible: true,
          selectedkeys: selected
        }
      });
    }
  },
  // subscriptions: {
  //   //实现属性组得读取，应点击tree节点后发送请求
  //   setup({ dispatch, history }) {
  //     history.listen(({ pathname }) => {
  //       if (pathname === '/brand/industrial') {
  //         dispatch({
  //           type: 'load',
  //           payload: {
  //             page: 1,
  //             size: 5,
  //           },
  //         });
  //       }
  //     });
  //   },
  // }
}
