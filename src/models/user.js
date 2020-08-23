import request from '../utils/requestUser'
import {getUser} from '../services/userService'

export default {
    namespace: 'user',
    //该模型中的一些属性
    state: {
        data: []
    },
    //一些正常的同步方法
    reducers: {
        //state是原先的数据，result是effets中异步调用返回的数据
        save(state, result){
            //如果 result.data中存在数据，表示该函数是被异步调用初始化。直接返回
            if (result.data){
                return result.data;
            }
            let list = [...state.data, 'br'];
            //返回更新后的state对象
            return {
                data: list
            }
        }
    },
    effects: {
        // 这里定义异步方法
        *initData(params, sagaEffects) { //定义异步方法
            const {call, put} = sagaEffects; //获取到call、put方法
            // let resultA= yield call(getUser);//执行请求
            // console.log(resultA)
            // let data=resultA.map(x => {return x.name})
            // console.log(data)   
            // let result={data}
            //  console.log(result)
            let {infor}= yield call(getUser);//执行请求
            let dataArr = infor
            console.log(dataArr)
             let data=dataArr.map(x => {return x.name})  
             console.log(data) 
             let result={data}  //转换为obj
             console.log(result)         
            yield put({ // 调用reducers中的方法
                type : "save", //指定方法名
                data : result  //传递ajax回来的数据, 注意 put 会指定调用的同步方法[reducers 中定义的方法],
                //该调用的方法会在定义的方法的入参添加一个参数（result）, 使用该参数才能获取到put方法,取到的值
            });
             
        }
    }

}
