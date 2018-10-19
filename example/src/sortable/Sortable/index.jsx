import React, {
  Children, Component, cloneElement, createRef,
} from 'react';
import PropTypes from 'prop-types';

import merge from 'react-merge-props-and-styles';
import Touchpad from 'react-touchpad';

import Content from './Content';
import getOffsetFactor from './getOffsetFactor';

export default class Sortable extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    consumerProps: PropTypes.shape(),
    ghostProps: PropTypes.shape(),
    producerProps: PropTypes.shape(),
    onSort: PropTypes.func,
  }
  static defaultProps = {
    consumerProps: {},
    ghostProps: {},
    producerProps: {},
    onSort() {},
  }
  state = {
    consumerIndex: -1,
    producerIndex: -1,
    offsetFactor: 0, // eslint-disable-line react/no-unused-state
    canvasOffsetY: 0,
    canvasY: 0,
    itemY: 0,
    itemX: 0,
  }

  ghostRef = createRef();
  wrapRef = createRef();
  touchpadRef = createRef();

  childRefs = {}

  get childrenArray() { return Children.toArray(this.props.children); }
  get currentCanvasY() {
    const { canvasY, canvasOffsetY } = this.state;
    return this.hasDragState ? this.setBounds(canvasY + canvasOffsetY) : canvasY;
  }
  get hasDragState() { return this.state.producerIndex !== -1; }
  get friction() { return this.hasDragState ? 0.03 : undefined; }
  get ghost() {
    if (!this.hasDragState) return null;
    const { producer } = this;
    const nextProps = merge(producer.props, this.ghostProps);
    return cloneElement(producer, nextProps);
  }
  get ghostProps() {
    if (!this.hasDragState) return {};
    const {
      producerIndex, canvasY, itemY, itemX,
    } = this.state;
    const { offsetTop, offsetWidth } = this.getChildRef(producerIndex).current;
    return merge(
      this.producer.props,
      {
        style: {
          position: 'absolute',
          left: 0,
          top: offsetTop,
          transform: `translate(${itemX}px, ${canvasY + itemY}px)`,
          width: offsetWidth,
        },
      },
      this.props.ghostProps,
      { ref: this.ghostRef },
    );
  }
  get producer() { return this.getChild(this.state.producerIndex); }

  getBounds = ({ offsetHeight, scrollHeight }) => {
    if (this.hasDragState) return {};
    this.bounds = {
      top: offsetHeight - scrollHeight,
      bottom: 0,
    };
    return this.bounds;
  };
  getChild = key => this.childrenArray[key];
  getChildRef = (key) => {
    const ref = this.childRefs[key];
    if (ref) return ref;
    const newRef = createRef();
    this.childRefs[key] = newRef;
    return newRef;
  }
  getChildProps = (key) => {
    const ref = this.getChildRef(key);
    const { props } = this.getChild(key);
    let nextProps = merge(props, { ref });
    if (key === this.state.producerIndex) {
      nextProps = merge(nextProps, this.props.producerProps);
    }
    if (key === this.state.consumerIndex) {
      nextProps = merge(nextProps, this.props.consumerProps);
    }
    return nextProps;
  };
  getPointIndex({ y }) {
    return this.childrenArray.findIndex((child, key) => {
      const { top, bottom } = this.getChildRef(key).current.getBoundingClientRect();
      return y >= top && y <= bottom;
    });
  }
  getConsumerIndex(consumerIndex) {
    const { top, height } = this.ghostRef.current.getBoundingClientRect();
    const y = height / 2 + top;
    const nextConsumerIndex = this.getPointIndex({ y });
    return nextConsumerIndex === -1 ? consumerIndex : nextConsumerIndex;
  }
  setBounds(value) {
    if (!this.bounds) return value;
    const { top, bottom } = this.bounds;
    if (value < top) return top;
    if (value > bottom) return bottom;
    return value;
  }


  handleHold = (modifiedEvent) => {
    const producerIndex = this.getPointIndex(modifiedEvent);
    this.replaceTouchpadState();
    this.setState({ itemX: 0, itemY: 0, producerIndex });
    this.createObserver();
  }
  handleStop = () => {
    const { currentCanvasY } = this;
    const { consumerIndex, producerIndex } = this.state;
    this.removeObserver();
    this.replaceTouchpadState();
    this.emitSort(producerIndex, consumerIndex);
    this.setState({
      consumerIndex: -1,
      producerIndex: -1,
      offsetFactor: 0, // eslint-disable-line react/no-unused-state
      canvasY: currentCanvasY,
      canvasOffsetY: 0,
      itemX: 0,
      itemY: 0,
    });
  }
  handleUpdate = ({ x, y }) => {
    if (this.hasDragState) {
      this.setState(({ canvasY }) => ({
        itemX: x,
        itemY: y - canvasY,
        offsetFactor: getOffsetFactor(this.wrapRef.current, this.ghostRef.current),
      }));
    } else {
      this.setState({ canvasY: y, itemX: 0 });
    }
  }
  handleObserve = () => {
    if (!this.hasDragState) return;
    this.setState(({ canvasOffsetY, consumerIndex, offsetFactor }) => ({
      consumerIndex: this.getConsumerIndex(consumerIndex),
      canvasOffsetY: canvasOffsetY + offsetFactor * 12,
    }));
  }

  modifyChild = (Child, key) => cloneElement(Child, this.getChildProps(key));

  createObserver() { this.observer = setInterval(this.handleObserve, 16); }
  removeObserver() { clearInterval(this.observer); }
  replaceTouchpadState() {
    const { currentCanvasY } = this;
    this.touchpadRef.current.replaceState({ x: 0, y: currentCanvasY }, this.hasDragState);
  }
  emitSort(producer, consumer) {
    if (producer === consumer) return;
    this.props.onSort(producer, consumer);
  }

  render = () => (
    <div ref={this.wrapRef} style={{ position: 'relative', height: '100%' }}>
      <Touchpad
        bounds={this.getBounds}
        friction={this.friction}
        holdDelay={300}
        onUpdate={this.handleUpdate}
        onHold={this.handleHold}
        onStop={this.handleStop}
        ref={this.touchpadRef}
        style={{
          height: '100%',
          userSelect: 'none',
          overflow: 'hidden',
        }}
      >
        <Content offsetY={this.currentCanvasY}>
          {this.childrenArray.map(this.modifyChild)}
        </Content>
      </Touchpad>
      {this.ghost}
    </div>
  );
}
