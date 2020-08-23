import React from 'react';
import { Input, Button } from 'antd';

class InputButton2 extends React.Component {
  valueStr = () => {
    const value = this.props.selectedBrandName.brandName;
    if (value) {
      return value;
    } else {
      return null;
    }
  };

  render() {
    return (
      <>
        <Input style={{ width: '82%' }} value={this.valueStr()} readOnly />
        <Button shape="circle" onClick={this.props.onClick}>
          ...
        </Button>
      </>
    );
  }
}

export default InputButton2;
