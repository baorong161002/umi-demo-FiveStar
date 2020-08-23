
import { getBrandList } from '../services/userService'
import { searchBrandInfor } from '../services/userService'
import { deleteBrandInfor } from '../services/userService'
import { addBrandInfor } from '../services/userService'
import { editBrandInfor } from '../services/userService'

export default {
  namespace: 'brand',
  state: {
    data: [],
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  },
  effects: {
    *load({ payload: { page, size } }, { select, put, call }) {
      let { infor } = yield call(getBrandList, { page, size });//执行请求
      let dataArr = infor
      let result = { dataArr }
      //console.log("加载阶段",result)        
      yield put({ // 调用reducers中的方法
        type: "save", //指定方法名
        payload: { data: result.dataArr }
      });
    },
    *search({ payload: { brandName, status, page, size } }, { put, call, select }) {

      const { infor } = yield call(searchBrandInfor, { brandName, status, page, size })
      let dataArr = infor
      let result = { dataArr }
      yield put({
        type: 'save',
        payload: {
          data: result.dataArr
        },
      });

    },
    //删除
    *delete({ payload: { key } }, { put, call, select }) {
      const { infor } = yield call(deleteBrandInfor, { key })
      let dataArr = infor
      let result = { dataArr }
      yield put({ // 调用reducers中的方法
        type: "save", //指定方法名
        payload: { data: result.dataArr }
      });

    },
    //新增
    *add({ payload: { brandName, status, actionPerson, actionTime } }, { put, call, select }) {
      const { infor } = yield call(addBrandInfor, { brandName, status, actionPerson, actionTime })
      let dataArr = infor
      let result = { dataArr }
      yield put({ // 调用reducers中的方法
        type: "save", //指定方法名
        payload: { data: result.dataArr }
      });
    },
    //编辑
    *edit({ payload: { key, brandName, status, actionPerson, actionTime } }, { put, call, select }) {
      const { infor } = yield call(editBrandInfor, { key, brandName, status, actionPerson, actionTime })
      let dataArr = infor
      let result = { dataArr }
      yield put({ // 调用reducers中的方法
        type: "save", //指定方法名
        payload: { data: result.dataArr }
      });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/brand/confirm') {  //订阅
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