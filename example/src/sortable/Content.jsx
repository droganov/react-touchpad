import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children, offsetY, y }) => (
  <div style={{ transform: `translateY(${offsetY}px)` }}>
    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.node.isRequired,
  offsetY: PropTypes.number.isRequired,
};

export default Content;
