import React from 'react';
import PropTypes from 'prop-types';

const TouchContent = ({ children, x }) => (
  <div
    style={{
      transform: `translateX(${x}px)`,
      willChange: 'transform',
      whiteSpace: 'nowrap',
      userSelect: 'none',
    }}
  >
    {children}
  </div>
);

TouchContent.propTypes = {
  children: PropTypes.node.isRequired,
  x: PropTypes.number,
};
TouchContent.defaultProps = {
  x: 0,
};

export default TouchContent;
