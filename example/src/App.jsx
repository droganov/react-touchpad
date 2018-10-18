import React, { Component } from 'react';

import Scrollable from './Scrollable';
import Sortable from './Sortable';


export default class App extends Component {
  state = {
    View: Sortable,
  }
  Button = ({ View, name }) => (
    <button
      onClick={() => this.setState({ View })}
      style={{
        background: View === this.state.View ? '#cc1' : 'none',
        border: 0,
        borderRadius: 3,
        padding: 8,
      }}
      type="button"
    >
      {name}
    </button>
  );
  render() {
    const { View } = this.state;
    return (
      <div style={{ margin: 10 }}>
        <h3>Exmaples</h3>
        <hr />
        <nav>
          <this.Button View={Sortable} name="Scroll + Sort" />
          <this.Button View={Scrollable} name="Scroll" />
        </nav>
        <hr />
        <div style={{ background: '#cc1', borderRadius: 3, padding: 4 }}>
          <View />
        </div>
      </div>
    );
  }
}
