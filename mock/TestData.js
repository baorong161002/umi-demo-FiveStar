import Mock from 'mockjs';
import { getRandomArray } from '../src/utils/utils';

let { attributes } = Mock.mock({
  'attributes|20': [
    {
      'id|+1': 1,
      'name|1': ['增购期限', '颜色', '支付方式', '材质', '珠宝颜色', '内存'],
      'unit|1': ['件', '千克', '米'],
      'saleSupport|1': [true, false],
      'nullable|1': [true, false],
      'available|1': [true],
      'searchSupport|1': [true, false],
      'defaultValue|1': ['100'],
      'updateTime|1': ['2020-08-07 10:28:28'],
      'creator|1': ['12332'],
      'updater|1': ['12332'],
      'createTime|1': ['2020-1-1', '2020-12-1'],
      'description|1': ['这是a', '这是b', '这是c'],
      'inputType|1': [0, 1, 2, 3],
      'valueList|1': [
        [
          {
            'key|+1': Mock.Random.id(),
            'name|1': ['玫瑰红', '柠檬黄', '天海蓝', '草龟绿'],
            'order|1': [1, 2, 3, 4, 5],
          },
          {
            'key|+1': Mock.Random.id(),
            'name|1': ['16G', '32g', '64G', '128G'],
            'order|1': [5, 6, 7, 8, 9],
          },
        ],
      ],
    },
  ],
});

const childData = [
  {
    title: '家用空调',
    key: '0-0',
    categoryId: 10,
  },
  { title: '商用空调', key: '0-1', isLeaf: true },
];
const child2Data = [
  {
    title: '挂机',
    key: '0-0-0',
    categoryId: 100,
    isLeaf: true,
  },
  { title: '柜机', key: '0-0-1', isLeaf: true },
  { title: '吸顶机', key: '0-0-2', isLeaf: true },
];

let { Groups } = Mock.mock({
  'Groups|5': [
    {
      'id|+1': 2,
      'name|+1': ['基本属性', '产品清单', '包装清单', '基本参数', '规格参数'],
      'sequence|+1': 1,
      'attributes|2-5': [
        {
          'id|+1': 1,
          'name|1': [
            '增购期限',
            '颜色',
            '支付方式',
            '材质',
            '珠宝颜色',
            '内存',
          ],
          'unit|1': ['件', '千克', '米'],
          'saleSupport|1': [true, false],
          'nullable|1': [true, false],
          'available|1': [true],
          'searchSupport|1': [true, false],
          'defaultValue|1': ['100'],
          'updateTime|1': ['2020-08-07 10:28:28'],
          'creator|1': ['12332'],
          'updater|1': ['12332'],
          'createTime|1': ['2020-1-1', '2020-12-1'],
          'description|1': ['这是a', '这是b', '这是c'],
          'inputType|1': [0, 1, 2, 3],
          'valueList|1': [
            [
              {
                'key|+1': Mock.Random.id(),
                'name|1': ['玫瑰红', '柠檬黄', '天海蓝', '草龟绿'],
                'order|1': [1, 2, 3, 4, 5],
              },
              {
                'key|+1': Mock.Random.id(),
                'name|1': ['16G', '32g', '64G', '128G'],
                'order|1': [5, 6, 7, 8, 9],
              },
            ],
          ],
        },
      ],
    },
  ],
});

module.exports = {
  [`GET /brand/industrial/getTreeChild`](req, res) {
    const mes = req.query;
    const { key } = mes;
    if (key == 0) {
      console.log('----进入mockTree获取child----', key);
      res.status(200).json(childData);
    } else if (key == '0-0') {
      console.log('----进入mockTree获取三级child----', key);
      res.status(200).json(child2Data);
    }
  },

  //根据工业树进行初始化
  [`GET /getAttrByCategoryId`](req, res) {
    const mes = req.query;
    const { categoryId } = mes;
    // if (categoryId == 100) {
    let content = Groups;
    let data = {
      content: content,
    };
    console.log('----进入mock数据初始化----');
    res.status(200).json(data);
    // }
  },

  //新增编辑属性组
  [`POST /brand/industrial/attrGroup`](req, res) {
    const mes = req.body;
    const { record } = mes;
    const { id } = record;
    if (id == '') {
      record.id = dataSource.length + 1;
      dataSource.unshift(record);
      let content = dataSource.slice(0, 5); //根据页码size进行准确的数据读取
      let data = {
        content: content,
        code: 2000,
        success: true,
        message: null,
      };
      console.log('----进入mock数据新增----');
      res.status(200).json(data);
    } else {
      dataSource.forEach(item => {
        if (item.id == record.id) {
          const de = item;
          for (let i = 0, l = dataSource.length; i < l; i++) {
            if (dataSource[i] === de) {
              dataSource[i] = record;
              i--;
            }
          }
        }
      });
      let content = dataSource.slice(0, 5);
      let data = {
        content: content,
      };
      console.log('----进入mock数据编辑----');
      res.status(200).json(data);
    }
  },

  //根据属性组查属性
  [`GET /getAttrByGroup`](req, res) {
    const mes = req.query;
    Groups.forEach(item => {
      if (item.id == mes.id) {
        const { attributes } = item;
        let content = attributes;
        let data = {
          content: content,
        };
        console.log('----进入mock数据根据属性组查属性----');
        res.status(200).json(data);
      }
    });
  },

  //初始化得到属性表
  [`GET /attribute`](req, res) {
    const mes = req.query;
    let list = [];
    attributes.forEach(item => {
      if (item.available === true) {
        list.push(item);
      }
    });
    //let content = list.slice((mes.page - 1) * mes.size, mes.page * mes.size)
    let data = {
      content: attributes,
    };
    console.log('----进入mock数据初始化----');
    res.status(200).json(data);
  },
  //根据属性组ID查询出所有属性，但是与该属性组绑定的属性排在上面，与上一个接口联合使用
  [`GET /getAllAttrByGroupIdSort`](req, res) {
    const mes = req.query;
    const { id } = mes;
    let data = {
      content: attributes,
    };
    console.log('----进入mock数据绑定属性获取----');
    res.status(200).json(data);
  },
  //编辑
  [`PUT /brand/attr/attribute`](req, res) {
    const mes = req.body;
    const { record } = mes;
    attributes.forEach(item => {
      if (item.id == record.id) {
        const de = item;
        for (let i = 0, l = attributes.length; i < l; i++) {
          if (attributes[i] === de) {
            attributes[i] = record;
            i--;
          }
        }
      }
    });
    //根据页码size进行准确的数据读取
    let content = attributes.slice(0, 5);
    let data = {
      content: content,
    };
    console.log('----进入mock数据编辑----');
    res.status(200).json(data);
  },
};
