import React from 'react';
import BreadcrumbContext from '../breadContext/index';

export default class BreadContent extends React.Component {
  render() {
    return (
      <div>
        <div style={{ fontSize: 18, color: '	#6495ED' }}>
          <BreadcrumbContext.Consumer>
            {value => value}
          </BreadcrumbContext.Consumer>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
