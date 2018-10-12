import React, { Component } from 'react';
import Touchpad from 'react-touchpad';

import Content from './Content';
import Thumb from './Thumb';

export default class App extends Component {
  state = {
    offsetY: 0,
  }
  get bounds() {

  }
  handleUpdate = ({ y }) => {
    this.setState({ offsetY: y });
  }
  render() {
    return (
      <div style={{ margin: 10 }}>
        <Touchpad
          onUpdate={this.handleUpdate}
          onHold={() => console.log("hold")}
          style={{
            background: '#cc1',
            border: '1px solid #cc2',
            height: 500,
            userSelect: 'none',
            overflow: 'hidden',
            position: 'relative',
            width: 260,
          }}
        >
          <Content offsetY={this.state.offsetY}>
            <Thumb />
          </Content>
        </Touchpad>
      </div>
    );
  }
}
