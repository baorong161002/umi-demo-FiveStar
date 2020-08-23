import Mock from 'mockjs';
let Random = Mock.Random;

//枚举的工具对象
//其实就是`map`方法遍历一个数组，生成一个数组和一个`code`数组，`code`和新数组的序号是一致的，所以就可以轻易的输入`code`拿到想要的值
class EsEnum {
    constructor(arr) {
        let typeArr = [];
        if (!Array.isArray(arr)){
            throw 'arr is not an array!';
            return;
        }

        arr.map(element => {
            if(!element.code || !element.name) {
                return;
            }
            // 保存code值组成的数组，方便A.getName(name)类型的调用
            typeArr.push(element.code);
            // 根据code生成不同属性值，以便A.B.name类型的调用
            this[element.code] = element;
        });
        
        // 保存源数组
        this.arr = arr; 
        this.typeArr = typeArr;
    }

    // 根据code得到对象
    valueOf(code) {
        return this.arr[this.typeArr.indexOf(code)];
    }

    // 根据code获取name值
    getNameByCode(code){
        let prop = this.valueOf(code);
        if (!prop){
            throw 'No enum constant'  + code;
            return;
        }

        return prop.name;
    }

    // 返回源数组
    getValues() {
        return this.arr;
    }
}


// // 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
//  Mock.setup({
//     timeout: '200 - 400'
// })

    
//接口api
/** 
 *  * @description: 通用工具类  
 *  * @author: StephenWu5   
 *  * @paras   接口链接，接口类型，返回数据结构，返回数据的长度
 *  * @date: 2019-12-3 15:38:27 
 */
export const  createApiByMock = function(apiUrl,apiType,paraSet) {  
    let data = []; //等下要返回的数据
    let returnData ={};
    let dataLength = paraSet.dataLength || 10;

    for (let i = 0; i < dataLength; i++) {
        let images = [1,2,3].map(x=>Random.image('200x100', Random.color(), Random.word(2,6))); //随机成长3个图片信息 尺寸 颜色 和随机字母的数组
        let paraSetNew = JSON.parse(JSON.stringify(paraSet))
        let dataTypeEnum = new EsEnum([
            //==============================================配置的开始==========================================================
            {code: '0', i},   //id 唯一性
            {code: '1', name: Random.cname()},   //中文姓名    cfirst 模拟姓氏  clast 模拟名字    name 英文名字
            {code: '2', name: Random.cword(8,20)},   //标题  8和20是长度
            {code: '3', name: Random.integer(100,5000)},   // 100到5000的随机整数    natural  返回随机的自然数
            {code: '4', name: images.slice(0,Random.integer(1,3))},//截取随机一到三个图片    
            {code: '5', name: Random.image('200x100', '#4A7BF7', 'picture')}, //模拟图片 宽高不指定则随机   
            {code: '6', name: Random.date()},   //日期  yyyy-MM-dd   yyyy-mm-dd是指定格式
            {code: '7', name: Random.time()},   //时间
            {code: '8', name: Random.province()},   //省
            {code: '9', name: Random.city()},   //市  Mock.mock('@city(true)')  加参数true会有奇效哈
            {code: '10', name: Random.county()},   //区   Mock.mock('@county(true)')
            {code: '11', name: Mock.mock('@EMAIL()')},   //邮箱
            {code: '12', name: Mock.mock(/^1[0-9]{10}$/)},   //手机(座机)  这里可以正则
            {code: '13', name: Mock.mock('13531544954')},   //身份证

            Mock.mock({ code: '14', "name|1":['精品语文班','精品作业A班','英语班','语文班']}),   //身份证包括一切的枚举，使用率最高

            {code: '21', name: Random.csentence(5, 10)},   //生成一条随机的中文句子
            {code: '22', name: Random.cparagraph(0, 10)},   //随机生成0到10段句子
            {code: '23', name: Random.url()},   //url
            {code: '24', name: Random.ip()},   //ip
        //==============================================配置的结束==========================================================
        ])
        for(let key in paraSetNew){
            if(!key){  
                return;
            }
            if(key === 'dataLength'){
                continue;
            }
            paraSetNew[''+key] = dataTypeEnum[""+paraSet[""+key]]['name']
        } 

        delete paraSetNew.dataLength;  //就看你想不想留dataLength;
        data.push(
            //{allData: (dataTypeEnum)},  //这里就是精华所在哈
            paraSetNew
        )
    }

    //利用assign添加默认值 status message
    returnData = Object.assign({
        status: 200,
        message: 'success',
        length: data.length,
    }, {data});


    // Mock.mock( url, post/get , 返回的数据)；
    Mock.mock(apiUrl,apiType, returnData); // 获取验证码
}