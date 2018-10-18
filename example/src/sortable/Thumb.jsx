import React from 'react';
import PropTypes from 'prop-types';


const Thumb = ({ item }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 3,
      boxSizing: 'border-box',
      padding: 16,
      height: 140,
    }}
  >
    Thumb {item + 1}
  </div>
);

Thumb.propTypes = {
  item: PropTypes.number.isRequired,
};

export default Thumb;
