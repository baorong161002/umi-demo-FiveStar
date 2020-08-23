import Mock from 'mockjs';

let { dataSource } = Mock.mock({
  'dataSource|40': [
    {
      'key|+1': 1,
      'brandName|1': ['小度', '卡萨帝', '格力', '惠普', '美的', '志高'],
      'status|1': [1, 2, 3, 4],
      'actionPerson|1': ['br', 'haha', 'xxx'],
      'actionTime|1': ['2020-08-01', '2020-08-02', '2020-07-31'],
    },
  ],
});

module.exports = {
  //初始化
  [`GET /brand/tableInfor`](req, res) {
    const mes = req.query;
    //console.log(dataSource)
    let content = dataSource.slice(
      (mes.page - 1) * mes.size,
      mes.page * mes.size,
    ); //根据页码size进行准确的数据读取
    let data = {
      content: content,
      totalPage: 30,
      page: 1,
      size: 5,
    };
    console.log('----进入mock数据初始化----');
    res.status(200).json(data);
  },

  //查询操作
  [`POST /brand/searchInfor`](req, res) {
    const mes = req.body;
    const { brandName, status, page, size } = mes;
    let list = [];
    dataSource.forEach(item => {
      //获得查询列表
      if (item.brandName.includes(brandName)) {
        if (status == 0) {
          list.push(item);
        } else if (!status || item.status == status) {
          list.push(item);
        }
      }
    });
    let content = list.slice((mes.page - 1) * mes.size, mes.page * mes.size);
    let totalPage = list.length / size + 1;

    let data = {
      content: content,
      totalPage: totalPage,
      page: 1,
      size: 5,
    };
    console.log('----进入mock数据查询----', mes);
    res.status(200).json(data);
  },

  //新增
  [`POST /brand/addInfor`](req, res) {
    const mes = req.body;
    mes.key = dataSource.length + 1;
    dataSource.unshift(mes);
    let content = dataSource.slice(0, 5); //根据页码size进行准确的数据读取
    let data = {
      content: content,
      totalPage: 30,
      page: 1,
      size: 5,
    };
    console.log('----进入mock数据新增----');
    res.status(200).json(data);
  },

  //编辑
  [`POST /brand/editInfor`](req, res) {
    const mes = req.body;
    dataSource.forEach(item => {
      //获得查询列表
      if (item.key == mes.key) {
        const de = item;
        for (var i = 0, l = dataSource.length; i < l; i++) {
          if (dataSource[i] === de) {
            dataSource[i] = mes;
            i--;
          }
        }
      }
    });
    let content = dataSource.slice(0, 5); //根据页码size进行准确的数据读取
    let data = {
      content: content,
      totalPage: 30,
      page: 1,
      size: 5,
    };
    console.log('----进入mock数据编辑----');
    res.status(200).json(data);
  },

  //删除操作
  [`GET /brand/delete`](req, res) {
    const mes = req.query;
    const { key } = mes;

    dataSource.forEach(item => {
      if (item.key == key) {
        const de = item;
        for (var i = 0, l = dataSource.length; i < l; i++) {
          if (dataSource[i] === de) {
            dataSource.splice(i, 1);
            i--;
          }
        }
      }
    });
    let content = dataSource.slice(0, 5); //根据页码size进行准确的数据读取
    let data = {
      content: content,
      totalPage: 30,
      page: 1,
      size: 5,
    };
    console.log('----进入mock数据删除----');
    res.status(200).json(data);
  },
};
