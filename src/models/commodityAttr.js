import { editOraddAttr } from '../services/attrService'
import { getCommodityAttrList } from '../services/attrService'

export default {
  namespace: 'commAttr',
  state: {
    data: [],
    visible: false,
    appClassVisible: false,
    childVisible: false,
    record: {},
    editingKey: '',
    order: 3,
    dataAttrValue: [

    ]

  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    //控制state
    changeState(state, { payload }) {
      //console.log("进入models",payload)
      return {
        ...state,
        ...payload
      }
    },
  },
  effects: {
    *load({ payload: { page, size } }, { select, put, call }) {
      const { infor } = yield call(getCommodityAttrList, { page, size });//执行请求
      const dataArr = infor
      const result = { dataArr }
      console.log("load", result);
      yield put({
        type: "save",
        payload: { data: result.dataArr }
      });
    },
    *handleCancel({ payload }, { select, put, call }) {
      const { visible } = payload
      yield put({
        type: 'load',
        payload: {
          page: 1,
          size: 5,
        },
      });
      yield put({
        type: "save",
        payload: { visible: visible }
      });
    },

    *editOraddRecord({ payload }, { select, put, call }) {
      //发送一个put请求，id是否存在由后端进行判断--请求API请求路径：/attribute
      //判断返回的code，成功则对dialog进行关闭
      const { visible, record } = payload
      console.log("表格数据", record)
      const { infor } = yield call(editOraddAttr, { record });
      const dataArr = infor
      const result = { dataArr }
      yield put({
        type: "save",
        payload: {
          visible: visible,
          data: result.dataArr
        }
      });
    },

    //改变可选值
    *changeValueList({ payload }, { select, put, call }) {
      const { childVisible } = payload
      const value = yield select(({ commAttr }) => commAttr.dataAttrValue)
      const record = yield select(({ commAttr }) => commAttr.record)
      record.valueList = value
      console.log("属性值弹框确认", record)
      yield put({
        type: "save",
        payload: {
          childVisible: childVisible,
          record: record
        }
      });
    },
    //属性值弹框取消按钮
    *cancelValueList({ payload }, { select, put, call }) {
      const { childVisible } = payload
      console.log(childVisible)
      const record = yield select(({ commAttr }) => commAttr.record)
      yield put({
        type: "save",
        payload: {
          childVisible: childVisible,
          dataAttrValue: [],
        }
      });
      yield put({
        type: "save",
        payload: {
          dataAttrValue: record.valueList,
        }
      });
    },
    //属性查找
    *searchAttr({ payload }, { select, put, call }) {
      const { mes } = payload
      console.log("查找表单", mes);
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/brand/attributr') {  //订阅
          dispatch({
            type: 'load', //加载默认值
            payload: {
              page: 1,
              size: 5,
            },
          });
        }
      });
    },
  }
}
