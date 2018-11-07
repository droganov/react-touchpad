import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children }) => (
  <div
    style={{
      backgroundColor: '#fff',
      display: 'inline-block',
      margin: 4,
      textAlign: 'center',
      padding: '72px 0',
      width: 240,
    }}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
