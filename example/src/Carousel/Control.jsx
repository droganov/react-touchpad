import React from 'react';
import PropTypes from 'prop-types';

const getClassName = (active, first) => {
  const classNames = ['carousel__control'];
  if (active) classNames.push('carousel__control--active');
  classNames.push(first ? 'carousel__control--first' : 'carousel__control--last');
  return classNames.join(' ');
};

const SliderControl = ({ active, first, onClick }) => (
  <button
    className={getClassName(active, first)}
    disabled={!active}
    onClick={() => onClick(first ? 1 : -1)}
    rize={2}
    height={88}
    type="button"
  >
    {first ? '<' : '>'}
  </button>
);

SliderControl.propTypes = {
  active: PropTypes.bool.isRequired,
  first: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
SliderControl.defaultProps = {
  first: false,
};

export default SliderControl;
