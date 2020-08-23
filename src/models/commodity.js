import { getBrandList } from '../services/userService';
import { getCategoryGroup } from '../services/categoryService';
export default {
  namespace: 'commodity',
  state: {
    brandVisible: false,
    industrialVisible: false,
    brandData: [],
    groupAttrData: { content: [] },
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
    //form组件品牌工业分类相关联处理
    *editForm({ payload }, { select, put, call }) {
      //选择品牌工业分类后加载详细信息
      const id = 0;
      const { infor } = yield call(getCategoryGroup, { categoryId: id });
      const dataArr = infor;
      const result = { dataArr };
      yield put({
        type: 'updateState',
        payload: {
          groupAttrData: result.dataArr,
        },
      });
      const { industrialVisible } = payload;
      const selectedCategoryName = yield select(
        ({ commodity }) => commodity.selectedCategoryName,
      );
      const selectedBrandName = yield select(
        ({ commodity }) => commodity.selectedBrandName,
      );
      const { key, title } = selectedCategoryName;
      const record = yield select(({ commodity }) => commodity.record);
      record.categoryId = key;
      record.categoryName = '空调家用空调' + title;
      record.commodityName = selectedBrandName.brandName + record.categoryName;
      record.commodityDescription = record.commodityName;
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
