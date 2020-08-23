import { fetch } from 'dva';

const checkStatus = response => {
  if (response.status == 200) return response;
  throw { message: 'error' };
};
const parseJson = response => {
  const { statusText, status } = response;
  return response.json().then(res => {
    //总的return一个返回值
    console.log('进入请求返回阶段', res); //前面加上常量字符串
    return {
      infor: res,
      statusCode: status,
      message: statusText,
      success: true,
    };
  });
};
const parseQuery = obj => {
  let str = '';
  for (let key in obj) {
    const value =
      typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key];
    str += '&' + key + '=' + value;
  }
  return str.substr(1);
};

export default (type, url, message) => {
  console.log('发送请求', message);

  const op = {
    method: type, // HTTP请求方法，默认为GET
    headers: {
      // HTTP的请求头，默认为{}
      'Content-Type': 'application/json',
    },
    credentials: 'include', // 是否携带cookie，默认为omit,不携带; same-origi,同源携带; include,同源跨域都携带
  };
  if (type === 'GET') {
    url += '?' + parseQuery(message);
  } else {
    op.body = JSON.stringify(message); //进行格式更改，不然会报错
  }
  // @ts-ignore
  return fetch(url, op)
    .then(checkStatus)
    .then(parseJson);
};
