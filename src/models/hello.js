// @ts-ignore
import {history} from 'umi'

export default {
    namespace: "hello",
    state: {
        value: 0,
    },
    effects: {  //对函数之外的东西产生副作用
        *redirect({payload}, {call, put, select}) {
            //history.push('/user')
            const value = yield select(({hello})=>hello.value)
            const infor = yield select(({hello})=>hello.infor)
            //console.log(value)
            yield put({type: 'updateState', payload: {value: value+1}})
        }
    },
    reducers: {
        updateState(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        },

    }
}
