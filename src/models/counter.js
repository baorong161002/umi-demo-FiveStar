// @ts-ignore

export default {
    namespace: "counter",
    state: {
        numberValue: 0,
 
    },
    // effects: {  //对函数之外的东西产生副作用
    //     *redirect({payload}, { put, select}) {
    //         //history.push('/user')
    //         const numberValue = yield select(({counter})=>counter.numberValue)
    //         console.log("store层数据"+numberValue)          
    //         yield put({type: 'updateState'})
    //     }
    // },
    reducers: {
        updateState(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        },

    }
}