import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Item = forwardRef(({ Element, children, ...rest }, ref) => (
  <div {...rest} ref={ref} onContextMenu={event => event.preventDefault()}>
    {children}
  </div>
));

Item.propTypes = {
  Element: PropTypes.string,
};

Item.defaultProps = {
  Element: 'div',
};

export default Item;
