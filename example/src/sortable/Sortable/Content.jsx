import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children, offsetY }) => (
  <div
    style={{
      position: 'relative',
      transform: `translateY(${offsetY}px)`,
    }}
  >
    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
  offsetY: PropTypes.number.isRequired,
};

export default Content;
