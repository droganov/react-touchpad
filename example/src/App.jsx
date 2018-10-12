import React, { Component } from 'react';

import Sortable from './sortable';


export default class App extends Component {
  state = {
    View: Sortable,
  }
  render() {
    const { View } = this.state;
    return (
      <div style={{ margin: 10 }}>
        <View />
      </div>
    );
  }
}
