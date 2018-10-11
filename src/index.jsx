import React, {
  Children,
  cloneElement,
  Component,
  createRef,
} from 'react';
import PropTypes from 'prop-types';
import makeTween from 'raf-tween';
import makeNumberInterpolator from 'raf-tween/lib/makeNumberInterpolator';
import makeOmitter from 'react-omit-own-props';

import applyBounds from './applyBounds';
import defaultTimingFunc from './defaultTimingFunc';
import define from './define';
import getDistance from './getDistance';
import getTime from './getTime';
import getNextOffset from './getNextOffset';
import interpolateOffset from './interpolateOffset';
import modify from './modify';
import prevent from './prevent';

const DEFAULT_STATE = {
  currentX: 0,
  currentY: 0,
  firstX: 0,
  firstY: 0,
};

const PROP_TYPES = {
  bounds: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
      bottom: PropTypes.number,
    }),
  ]),
  children: PropTypes.node.isRequired,
  defaultX: PropTypes.number,
  defaultY: PropTypes.number,
  disabled: PropTypes.bool,
  ease: PropTypes.func,
  element: PropTypes.string,
  friction: PropTypes.number,
  onUpdate: PropTypes.func,
  elasticity: PropTypes.number,
  windage: PropTypes.number,
};

const DEFAULT_PROPS = {
  bounds: {},
  defaultX: 0,
  defaultY: 0,
  disabled: false,
  ease: defaultTimingFunc,
  element: 'div',
  friction: 0.003,
  onUpdate: () => null,
  elasticity: 0.6,
  windage: 0.026,
};

const omit = makeOmitter(PROP_TYPES);

export default class ReactTouchpad extends Component {
  static propTypes = PROP_TYPES;
  static defaultProps = DEFAULT_PROPS;
  state = {
    ...DEFAULT_STATE,
    lastX: this.props.defaultX,
    lastY: this.props.defaultY,
  };
  emitUpdate = this.props.onUpdate;
  tween = makeTween({
    interpolator: (a, b) => i => ({
      x: makeNumberInterpolator(a.x, b.x)(i),
      y: makeNumberInterpolator(a.y, b.y)(i),
    }),
    ease: this.props.ease,
    onUpdate: this.replaceState.bind(this),
  });
  isMoving = false;
  node = createRef();
  trackingPoints = [];

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.stopMove);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.stopMove);
  }

  get isDisabled() { return this.props.disabled; }
  get bounds() {
    const { bounds } = this.props;
    const { top, left, bottom, right } = typeof bounds === 'function' && this.node.current
      ? bounds(this.node.current)
      : bounds;
    const { x, y } = this.offset;
    return {
      top: define(top, y),
      left: define(left, x),
      bottom: define(bottom, y),
      right: define(right, x),
    };
  }
  get childProps() {
    const { bounds, offset } = this;
    const { elasticity } = this.props;
    return interpolateOffset(offset, bounds, elasticity);
  }
  get offset() {
    const { firstX, firstY, lastX, lastY, currentX, currentY } = this.state;
    return {
      x: lastX + (currentX - firstX),
      y: lastY + (currentY - firstY),
    };
  }

  beginMove = (event) => {
    const modifiedEvent = modify(event);
    if (this.cancelTransition) this.cancelTransition();
    this.isMoving = true;
    this.trackingPoints = [];
    this.updateState(modifiedEvent);
  }
  fixState = () => {
    const { x: lastX, y: lastY } = this.offset;
    this.setState({ ...DEFAULT_STATE, lastX, lastY });
  }
  handleMove = (event) => {
    const modifiedEvent = modify(event);
    if (!this.isMoving) return;
    event.preventDefault();
    this.updateState(modifiedEvent);
    this.track(modifiedEvent.x, modifiedEvent.y);
  }
  stopMove = () => {
    if (!this.isMoving) return;
    this.isMoving = false;
    this.fixState();
    this.createMotionTween();
  }
  makeFitBounds = duration => () => {
    const { bounds, offset } = this;
    const { ease, elasticity } = this.props;
    const nextOffset = applyBounds(offset, bounds);
    this.tweenTo(offset, nextOffset, { duration: duration ** elasticity, ease });
  }

  createMotionTween() {
    const points = [...this.trackingPoints];
    if (points.length < 2) return;
    points.splice(1, points.length - 2);

    const { friction, windage } = this.props;

    const { offset } = this;
    const distance = getDistance(points);
    const time = getTime(points);
    const impulse = time * windage;
    const duration = impulse / friction;

    const nextOffset = getNextOffset(offset, distance, impulse);

    this.tweenTo(offset, nextOffset, { duration, onComplete: this.makeFitBounds(duration) });
  }
  replaceState({ x, y }) {
    if (this.isDisabled) return;
    this.setState({
      lastX: x,
      lastY: y,
    });
    this.emitUpdate(x, y);
  }
  updateState({ x, y }) {
    if (this.isDisabled) return;
    this.setState(({ firstX, firstY }) => ({
      firstX: define(firstX, x, DEFAULT_STATE.firstX),
      firstY: define(firstY, y, DEFAULT_STATE.firstY),
      currentX: x,
      currentY: y,
    }));
    this.emitUpdate(x, y);
  }
  tweenTo(offset, nextOffset, options) {
    this.cancelTransition = this.tween(offset, nextOffset, options);
  }

  track(x, y) {
    const ts = Date.now();
    const nextPoints = this.trackingPoints.filter(point => ts - point.ts < 100);
    this.trackingPoints = nextPoints;
    this.trackingPoints.push({ x, y, ts });
  }

  render() {
    const { element: Element } = this.props;
    const { childProps } = this;
    return (
      <Element
        {...omit(this.props)}
        onDragStart={prevent}
        onContextMenu={prevent}
        onMouseDown={this.beginMove}
        onTouchStart={this.beginMove}
        onTouchMove={this.handleMove}
        onTouchEnd={this.stopMove}
        onTouchCancel={this.stopMove}
        ref={this.node}
      >
        {Children.map(
          this.props.children,
          Child => cloneElement(Child, childProps),
        )}
      </Element>
    );
  }
}
