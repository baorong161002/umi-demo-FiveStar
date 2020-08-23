import { getBrandList } from '../services/userService';
export default {
  namespace: 'commodity',
  state: {
    brandVisible: false,
    industrialVisible: false,
    brandData: [],
    record: {
      brandId: '',
      categoryId: '',
    },
    selectedBrand: [],
    selectedBrandName: '',
    selectedCategoryName: {
      key: '',
      title: '',
    },
  },
  effects: {
    *load({ payload }, { select, put, call }) {
      const { brandVisible, page, size } = payload;
      let { infor } = yield call(getBrandList, { page, size });
      let dataArr = infor;
      let result = { dataArr };
      console.log('加载阶段', result);
      yield put({
        type: 'updateState',
        payload: {
          brandVisible: brandVisible,
          brandData: result.dataArr,
        },
      });
    },
    //form组件
    *editForm({ payload }, { select, put, call }) {
      const { industrialVisible } = payload;
      const selectedCategoryName = yield select(
        ({ commodity }) => commodity.selectedCategoryName,
      );
      const { key } = selectedCategoryName;
      const record = yield select(({ commodity }) => commodity.record);
      record.categoryId = key;
      console.log('from组件的数据处理', record);
      yield put({
        type: 'updateState',
        payload: {
          industrialVisible: industrialVisible,
          record: record,
        },
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
