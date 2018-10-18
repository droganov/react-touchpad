import React, { Component } from 'react';
import range from 'lodash/range';
import move from 'array-move';

import Sortable from './Sortable';
import Item from './Sortable/Item';
import Thumb from './Thumb';


export default class SortableExample extends Component {
  state = {
    items: range(0, 12),
  };
  handleSort = (producer, consumer) => this.setState(({ items }) => ({
    items: move(items, producer, consumer),
  }));
  render = () => (
    <div>
      <Sortable
        consumerProps={{
          style: { opacity: 0.2 },
        }}
        ghostProps={{
          style: {
            boxShadow: '1px 1px 16px rgba(0, 0, 0, 0.6)',
            userSelect: 'none',
          },
        }}
        onSort={this.handleSort}
      >
        {this.state.items.map(item => (
          <Item key={item} style={{ margin: 2 }}>
            <Thumb item={item} />
          </Item>
        ))}
      </Sortable>
    </div>
  );
}
