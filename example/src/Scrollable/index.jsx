import React from 'react';
import Touchpad from 'react-touchpad';

import Content from './Content';

const bounds = (node) => {
  const { height } = node.getBoundingClientRect();
  const { scrollHeight } = node;
  return { top: height - scrollHeight, bottom: 0, left: 0, right: 0 };
};


const Scrollable = () => (
  <Touchpad
    bounds={bounds}
    onUpdate={console.log}
    style={{
      background: '#cc1',
      border: '1px solid #cc2',
      height: 500,
      userSelect: 'none',
      overflow: 'hidden',
    }}
  >
    <Content />
  </Touchpad>
);


export default Scrollable;
