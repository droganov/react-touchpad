import React, { Component, createRef } from 'react';
// import PropTypes from 'prop-types';
import Touchpad from 'react-touchpad';
import throttle from 'lodash/throttle';

import getBounds from './get-bounds';
import Content from './Content';
import Control from './Control';
import Card from './Card';

require('./style.css');

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default class Carousel extends Component {
  static propTypes = {};
  state = { isActive: false };
  touchpad = createRef();
  x = 0;
  slideByTrottled = throttle(this.slideBy, 32);
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    this.clearTimeout();
    window.removeEventListener('resize', this.handleResize);
  }
  getBounds = (node) => {
    const { width, ...bounds } = getBounds(node);
    this.width = width;
    return bounds;
  }
  setActive = () => this.setState({ isActive: true })
  handleMouseEnter = () => {
    this.activeTimeout = setTimeout(this.setActive, 600);
  }
  handleMouseLeave = () => {
    this.setState({ isActive: false });
    this.clearTimeout();
  }
  handleClick = (sign) => {
    const duration = this.width || 800;
    const distance = duration * sign;
    this.slideBy(distance);
  };
  handleResize = () => this.slideByTrottled(0);

  slideBy(distance) {
    const touchpad = this.touchpad.current;
    const { offset } = touchpad;
    offset.x = distance + offset.x;
    const duration = 800;
    touchpad.tweenTo(offset, { duration, onComplete: touchpad.makeFitBounds(duration) });
  }
  clearTimeout() {
    clearTimeout(this.activeTimeout);
  }
  render() {
    const { handleClick, touchpad } = this;
    const { isActive } = this.state;
    return (
      <Touchpad
        bounds={this.getBounds}
        className="carousel"
        friction={0.0020}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={touchpad}
        windage={0.04}
      >
        <Content>
          {items.map(item => <Card key={item}>{item}</Card>)}
        </Content>
        <Control first active={isActive} onClick={handleClick} />
        <Control active={isActive} onClick={handleClick} />
      </Touchpad>
    );
  }
}
