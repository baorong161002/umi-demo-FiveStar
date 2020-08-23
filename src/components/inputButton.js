import React from 'react';
import { Input, Button } from 'antd';

class InputButton extends React.Component {

    valueStr = () => {
        const value=this.props.record.valueList
        let list = [];
        value.forEach(item => {
          if (item.name) {
            list.push(item.name)
          }
        });
        let str = list.toString();
        return str;
    };

    render() {
        return (
            <>
                <Input style={{ width: "240px" }} value={this.valueStr()} readOnly />
                <Button shape="circle" onClick={this.props.onClick}>...</Button>
            </>
        );
    }
}

export default InputButton;