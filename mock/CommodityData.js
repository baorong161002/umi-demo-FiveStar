import Mock from 'mockjs';

let { dataSource } = Mock.mock({
  'dataSource|20': [
    {
      'brandID|+1': 1,
      'brandName|1': ['小度', '卡萨帝', '华为', '小米', '格力', '惠普'],
      'industrial|1': [1, 2, 3, 4],
      'actionPerson|1': ['br', 'haha', 'xxx'],
      'actionTime|1': ['2020-08-01', '2020-08-02', '2020-07-31'],
    },
  ],
});

module.exports = {};
