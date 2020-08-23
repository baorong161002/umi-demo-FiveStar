import { Form, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import { Divider, Checkbox } from 'antd';
import InputButton2 from '../../../../components/InputButton2';
import InputButton3 from '../../../../components/InputButton3';
import './index.css';

// form css 样式
const formLayout = {
  labelAlign: 'right',
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 15,
  },
};
// form css 样式
const formLayoutGroup = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
//根据inputtype来渲染输入框
const switchItem = item => {
  const type = item.inputType;
  let list = [];
  //获得selec的option
  const valueList = item.valueList;
  valueList.forEach(item => {
    if (item) {
      list.push(item.name);
    }
  });
  switch (type) {
    case 0:
      //文本输入
      return <Input style={{ width: '100%' }} />;
      break;
    case 1:
      //单选下拉
      return (
        <Select style={{ width: '100%' }}>
          {valueList.map((item, index) => {
            return (
              <Option key={index} value={item.key}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      );
    case 2:
      //复选框
      return (
        <Checkbox.Group style={{ width: '100%' }}>
          {valueList.map((item, index) => {
            return (
              <Checkbox key={index} value={item.key}>
                {item.name}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      );
      break;
    case 3:
      //时间控件
      return <DatePicker style={{ width: '100%' }} />;
      break;
    default:
      return <Input style={{ width: '100%' }} />;
      break;
  }
};
class EntryForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    let { formDialog } = this;
    if (formDialog) {
      formDialog.setFieldsValue(this.props.record);
    } else {
      //         formDialog.resetFields(undefined)
    }
  }

  onFinish = values => {
    console.log('Received values of form: ', values);
  };
  onReset = () => {};

  //品牌modal
  brandOnClick = () => {
    this.props.getInfor(true);
  };
  categoryOnClick = () => {
    this.props.getTreeData(true);
  };

  render() {
    const { groupAttrData, record } = this.props;
    const { content } = groupAttrData;
    return (
      <div className="basic_attributes">
        <div className="header">
          &nbsp;
          <span className="basic_attributes_text">&nbsp;</span>
          &nbsp;&nbsp;&nbsp;
          <span style={{ fontSize: 18 }}>基本属性</span>
          <hr />
        </div>
        <div className="commodity_context">
          <Form
            ref={formDialog => {
              this.formDialog = formDialog;
            }}
            name="SearchForm"
            onFinish={this.onFinish}
            {...formLayout}
            initialValues={this.props.record}
          >
            <Row>
              <Col span={7}>
                <Form.Item
                  name="brandId"
                  label="品牌:"
                  wrapperCol={{ span: 24 }}
                >
                  <InputButton2
                    name="brandId"
                    {...this.props}
                    onClick={this.brandOnClick}
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  name="categoryId"
                  label="工业分类:"
                  wrapperCol={{ span: 24 }}
                >
                  <InputButton3
                    name="categoryId"
                    {...this.props}
                    onClick={this.categoryOnClick}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item name="categoryName" label="工业分类名称：">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <Form.Item name="origin" label="产地:">
                  <Input style={{ width: '93%' }} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="grossWeight" label="毛重:">
                  <Input style={{ width: '93%' }} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="productModel"
                  label="商品型号："
                  rules={[
                    {
                      required: true,
                      message: '请输入商品型号',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <Form.Item name="qualityLevel" label="质量等级:">
                  <Input style={{ width: '93%' }} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="unit" label="单位:">
                  <Input style={{ width: '93%' }} />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="operatingDepartment"
                  label="经营部门"
                  rules={[
                    {
                      required: true,
                      message: '请输入经营部门',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="commodityName"
                  label="商品名称"
                  rules={[
                    {
                      required: true,
                      message: '请输入商品名称',
                    },
                  ]}
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 21 }}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="commodityDescription"
                  label="描述"
                  rules={[
                    {
                      required: true,
                      message: '请输入商品描述',
                    },
                  ]}
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 21 }}
                >
                  <Input.TextArea style={{ height: '60px' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item name="commodityType" label="商品类型:"></Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="kucun" label="是否检查库存:">
                  <span>{'是'}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="dandu" label="是否单独销售">
                  <span>{'是'}</span>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item name="anzhaung" label="是否需要安装:">
                  <span>{'是'}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="shangmen" label="退货是否上门取件:">
                  <span>{'是'}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="dajia" label="是否大家电">
                  <span>{'是'}</span>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item name="weixiu" label="是否可维修:">
                  <span>{'是'}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="tuihuo" label="是否可退货:">
                  <span>{'是'}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="kuaidi" label="是否快递送货">
                  <span>{'是'}</span>
                </Form.Item>
              </Col>
            </Row>
            {content.map((item, index) => {
              return (
                <div key={index}>
                  <Row>
                    <Divider orientation="left">{item.name}</Divider>
                  </Row>
                  <Row id={index}>
                    {item.attributes.map((item, index) => {
                      // type 为 date 日期格式需要强制转化为 moment 格式
                      // item.value = item.inputType == 'date' ? moment(item.value, 'YYYY-MM-DD') : item.value;
                      return (
                        <Form.Item
                          key={item.id}
                          name={item.id}
                          label={item.name}
                          hasFeedback
                          style={{ width: '300px' }}
                        >
                          {switchItem(item)}
                        </Form.Item>
                      );
                    })}
                  </Row>
                </div>
              );
            })}
          </Form>
          <Row>
            <Col span={8}>
              <Form.Item name="ziyou" label="是否独有品牌:">
                <span>{'是'}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Form.Item wrapperCol={{ span: 12 }}>
              <Button>x 取消并返回列表</Button>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12 }}>
              <Button type="primary" htmlType="submit">
                保存并前往列表
              </Button>
            </Form.Item>
          </Row>
        </div>
      </div>
    );
  }
}
export default EntryForm;
