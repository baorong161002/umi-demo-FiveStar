import React from 'react';
import {
  Modal,
  Form,
  Input,
  Divider,
  Select,
  Checkbox,
  DatePicker,
  Col,
  Row,
} from 'antd';
import moment from 'moment';
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Option = Select.Option;

// form css 样式
const formLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
export default props => {
  const {
    previewVisible,
    changePreviewVisible,
    groupAttrData,
    attrdata,
  } = props;
  const { content } = groupAttrData;

  //预览dialog控制显示
  const changeVisible = () => {
    changePreviewVisible(false);
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
  return (
    <div>
      <Modal
        title="预览"
        visible={previewVisible}
        onOk={changeVisible}
        onCancel={changeVisible}
        width="1000px"
      >
        <Form {...formLayout}>
          {groupAttrData == 0
            ? null
            : content.map((item, index) => {
                return (
                  <div key={index}>
                    <Row>
                      <Divider orientation="left">{item.name}</Divider>
                    </Row>
                    <Row id={index}>
                      {attrdata == 0
                        ? null
                        : item.attributes.map((item, index) => {
                            // type 为 date 日期格式需要强制转化为 moment 格式
                            // item.value = item.inputType == 'date' ? moment(item.value, 'YYYY-MM-DD') : item.value;
                            return (
                              <Form.Item
                                key={item.id}
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
      </Modal>
    </div>
  );
};
