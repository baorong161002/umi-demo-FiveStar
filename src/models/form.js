
import { getRemoteList, editRecord, deleteRecord, addRecord } from '../services/userFormService';
import { message } from 'antd';



const UserModel = {
  namespace: 'users',
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      const data = yield call(getRemoteList, { page, per_page });
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *delete({ payload: { id } }, { put, call, select }) {
      const data = yield call(deleteRecord, { id });
      if (data) {
        message.success('Delete successfully.');
        const { page, per_page } = yield select(
          (state) => state.users.meta,
        );
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
      } else {
        message.error('Delete failed.');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};

export default UserModel;