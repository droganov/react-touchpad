import React, { Component, Fragment, createRef } from 'react';
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

  getBounds = node => {
    const { width, ...bounds } = getBounds(node);
    this.width = width;
    return bounds;
  };

  setActive = () => this.setState({ isActive: true });
  handleMouseEnter = () => {
    this.activeTimeout = setTimeout(this.setActive, 600);
  };
  handleMouseLeave = () => {
    this.setState({ isActive: false });
    this.clearTimeout();
  };
  handleClick = sign => {
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
    touchpad.tweenTo(offset, {
      duration,
      onComplete: touchpad.makeFitBounds(duration),
    });
  }
  clearTimeout() {
    clearTimeout(this.activeTimeout);
  }
  render() {
    const { handleClick, touchpad } = this;
    const { isActive } = this.state;
    return (
      <Fragment>
        <Touchpad
          bounds={this.getBounds}
          className="carousel"
          friction={0.002}
          lockX
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          ref={touchpad}
          windage={0.04}
        >
          <Content>
            {items.map(item => (
              <Card key={item}>{item}</Card>
            ))}
          </Content>
          <Control first active={isActive} onClick={handleClick} />
          <Control active={isActive} onClick={handleClick} />
        </Touchpad>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu lacinia nisl.
          Suspendisse non magna in dolor scelerisque mollis id finibus nibh. Sed et eros posuere,
          molestie arcu scelerisque, varius mauris. Vestibulum faucibus sodales tristique. Curabitur
          ac vestibulum dui, ac molestie erat. Nullam eleifend pellentesque tincidunt. Maecenas
          tristique dui feugiat iaculis luctus. Maecenas vehicula dictum sem, et elementum lectus
          facilisis sit amet. Mauris varius lobortis elit, sit amet vulputate diam pellentesque
          vitae. Integer blandit sagittis mollis. Duis dignissim lectus sed semper suscipit. Nunc
          ultrices augue nec sem posuere, id mollis orci cursus. Mauris posuere volutpat velit, sit
          amet feugiat turpis dapibus ut. Sed eu vulputate dui, non suscipit odio. Etiam luctus,
          tortor eget pretium ullamcorper, nisi nulla malesuada purus, nec feugiat nibh ipsum vitae
          libero.
        </p>
        <p>
          Donec laoreet, lorem consectetur condimentum suscipit, sapien ipsum ultrices tellus, at
          auctor ipsum tortor eget lacus. Maecenas in dolor erat. Vestibulum eu arcu malesuada,
          facilisis purus vitae, facilisis nunc. Vivamus elementum in urna ac condimentum.
          Vestibulum at elit lacinia felis facilisis maximus. Proin nec urna ut dui malesuada varius
          nec sit amet lorem. Aliquam pharetra urna et ligula hendrerit, at molestie nulla semper.
          Nunc sagittis lorem eu mi imperdiet egestas. Aliquam dignissim hendrerit ex, quis sagittis
          lectus dignissim ac. Donec ac elit lacinia, tempus dolor sed, dictum est. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eu massa
          lobortis, rutrum felis at, varius elit. Phasellus vel purus nec leo semper ultricies.
          Integer finibus, sapien sit amet placerat posuere, sapien turpis accumsan odio, at maximus
          metus dolor eu nunc. Nulla nec laoreet odio. Aliquam suscipit porta blandit.
        </p>
        <p>
          Donec imperdiet vehicula neque quis mattis. Maecenas commodo, turpis id volutpat
          convallis, tortor magna pharetra velit, maximus auctor nisl lorem et velit. Vivamus
          aliquam eget urna consequat vulputate. Donec lacus arcu, faucibus ac semper sit amet,
          sagittis sit amet libero. Cras sollicitudin ultrices odio quis rutrum. Sed non tristique
          ante. Maecenas a lacus turpis. Sed imperdiet, velit in porttitor tincidunt, sapien odio
          dictum sem, dignissim dictum lacus dui iaculis tellus. Morbi tristique pellentesque purus
          quis mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia Curae; Morbi et ex mollis, gravida nibh a, faucibus lorem. Donec eleifend purus id
          blandit maximus. Sed egestas elit ut urna semper imperdiet.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu lacinia nisl.
          Suspendisse non magna in dolor scelerisque mollis id finibus nibh. Sed et eros posuere,
          molestie arcu scelerisque, varius mauris. Vestibulum faucibus sodales tristique. Curabitur
          ac vestibulum dui, ac molestie erat. Nullam eleifend pellentesque tincidunt. Maecenas
          tristique dui feugiat iaculis luctus. Maecenas vehicula dictum sem, et elementum lectus
          facilisis sit amet. Mauris varius lobortis elit, sit amet vulputate diam pellentesque
          vitae. Integer blandit sagittis mollis. Duis dignissim lectus sed semper suscipit. Nunc
          ultrices augue nec sem posuere, id mollis orci cursus. Mauris posuere volutpat velit, sit
          amet feugiat turpis dapibus ut. Sed eu vulputate dui, non suscipit odio. Etiam luctus,
          tortor eget pretium ullamcorper, nisi nulla malesuada purus, nec feugiat nibh ipsum vitae
          libero.
        </p>
        <p>
          Donec laoreet, lorem consectetur condimentum suscipit, sapien ipsum ultrices tellus, at
          auctor ipsum tortor eget lacus. Maecenas in dolor erat. Vestibulum eu arcu malesuada,
          facilisis purus vitae, facilisis nunc. Vivamus elementum in urna ac condimentum.
          Vestibulum at elit lacinia felis facilisis maximus. Proin nec urna ut dui malesuada varius
          nec sit amet lorem. Aliquam pharetra urna et ligula hendrerit, at molestie nulla semper.
          Nunc sagittis lorem eu mi imperdiet egestas. Aliquam dignissim hendrerit ex, quis sagittis
          lectus dignissim ac. Donec ac elit lacinia, tempus dolor sed, dictum est. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eu massa
          lobortis, rutrum felis at, varius elit. Phasellus vel purus nec leo semper ultricies.
          Integer finibus, sapien sit amet placerat posuere, sapien turpis accumsan odio, at maximus
          metus dolor eu nunc. Nulla nec laoreet odio. Aliquam suscipit porta blandit.
        </p>
        <p>
          Donec imperdiet vehicula neque quis mattis. Maecenas commodo, turpis id volutpat
          convallis, tortor magna pharetra velit, maximus auctor nisl lorem et velit. Vivamus
          aliquam eget urna consequat vulputate. Donec lacus arcu, faucibus ac semper sit amet,
          sagittis sit amet libero. Cras sollicitudin ultrices odio quis rutrum. Sed non tristique
          ante. Maecenas a lacus turpis. Sed imperdiet, velit in porttitor tincidunt, sapien odio
          dictum sem, dignissim dictum lacus dui iaculis tellus. Morbi tristique pellentesque purus
          quis mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia Curae; Morbi et ex mollis, gravida nibh a, faucibus lorem. Donec eleifend purus id
          blandit maximus. Sed egestas elit ut urna semper imperdiet.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu lacinia nisl.
          Suspendisse non magna in dolor scelerisque mollis id finibus nibh. Sed et eros posuere,
          molestie arcu scelerisque, varius mauris. Vestibulum faucibus sodales tristique. Curabitur
          ac vestibulum dui, ac molestie erat. Nullam eleifend pellentesque tincidunt. Maecenas
          tristique dui feugiat iaculis luctus. Maecenas vehicula dictum sem, et elementum lectus
          facilisis sit amet. Mauris varius lobortis elit, sit amet vulputate diam pellentesque
          vitae. Integer blandit sagittis mollis. Duis dignissim lectus sed semper suscipit. Nunc
          ultrices augue nec sem posuere, id mollis orci cursus. Mauris posuere volutpat velit, sit
          amet feugiat turpis dapibus ut. Sed eu vulputate dui, non suscipit odio. Etiam luctus,
          tortor eget pretium ullamcorper, nisi nulla malesuada purus, nec feugiat nibh ipsum vitae
          libero.
        </p>
        <p>
          Donec laoreet, lorem consectetur condimentum suscipit, sapien ipsum ultrices tellus, at
          auctor ipsum tortor eget lacus. Maecenas in dolor erat. Vestibulum eu arcu malesuada,
          facilisis purus vitae, facilisis nunc. Vivamus elementum in urna ac condimentum.
          Vestibulum at elit lacinia felis facilisis maximus. Proin nec urna ut dui malesuada varius
          nec sit amet lorem. Aliquam pharetra urna et ligula hendrerit, at molestie nulla semper.
          Nunc sagittis lorem eu mi imperdiet egestas. Aliquam dignissim hendrerit ex, quis sagittis
          lectus dignissim ac. Donec ac elit lacinia, tempus dolor sed, dictum est. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eu massa
          lobortis, rutrum felis at, varius elit. Phasellus vel purus nec leo semper ultricies.
          Integer finibus, sapien sit amet placerat posuere, sapien turpis accumsan odio, at maximus
          metus dolor eu nunc. Nulla nec laoreet odio. Aliquam suscipit porta blandit.
        </p>
        <p>
          Donec imperdiet vehicula neque quis mattis. Maecenas commodo, turpis id volutpat
          convallis, tortor magna pharetra velit, maximus auctor nisl lorem et velit. Vivamus
          aliquam eget urna consequat vulputate. Donec lacus arcu, faucibus ac semper sit amet,
          sagittis sit amet libero. Cras sollicitudin ultrices odio quis rutrum. Sed non tristique
          ante. Maecenas a lacus turpis. Sed imperdiet, velit in porttitor tincidunt, sapien odio
          dictum sem, dignissim dictum lacus dui iaculis tellus. Morbi tristique pellentesque purus
          quis mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia Curae; Morbi et ex mollis, gravida nibh a, faucibus lorem. Donec eleifend purus id
          blandit maximus. Sed egestas elit ut urna semper imperdiet.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu lacinia nisl.
          Suspendisse non magna in dolor scelerisque mollis id finibus nibh. Sed et eros posuere,
          molestie arcu scelerisque, varius mauris. Vestibulum faucibus sodales tristique. Curabitur
          ac vestibulum dui, ac molestie erat. Nullam eleifend pellentesque tincidunt. Maecenas
          tristique dui feugiat iaculis luctus. Maecenas vehicula dictum sem, et elementum lectus
          facilisis sit amet. Mauris varius lobortis elit, sit amet vulputate diam pellentesque
          vitae. Integer blandit sagittis mollis. Duis dignissim lectus sed semper suscipit. Nunc
          ultrices augue nec sem posuere, id mollis orci cursus. Mauris posuere volutpat velit, sit
          amet feugiat turpis dapibus ut. Sed eu vulputate dui, non suscipit odio. Etiam luctus,
          tortor eget pretium ullamcorper, nisi nulla malesuada purus, nec feugiat nibh ipsum vitae
          libero.
        </p>
        <p>
          Donec laoreet, lorem consectetur condimentum suscipit, sapien ipsum ultrices tellus, at
          auctor ipsum tortor eget lacus. Maecenas in dolor erat. Vestibulum eu arcu malesuada,
          facilisis purus vitae, facilisis nunc. Vivamus elementum in urna ac condimentum.
          Vestibulum at elit lacinia felis facilisis maximus. Proin nec urna ut dui malesuada varius
          nec sit amet lorem. Aliquam pharetra urna et ligula hendrerit, at molestie nulla semper.
          Nunc sagittis lorem eu mi imperdiet egestas. Aliquam dignissim hendrerit ex, quis sagittis
          lectus dignissim ac. Donec ac elit lacinia, tempus dolor sed, dictum est. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec eu massa
          lobortis, rutrum felis at, varius elit. Phasellus vel purus nec leo semper ultricies.
          Integer finibus, sapien sit amet placerat posuere, sapien turpis accumsan odio, at maximus
          metus dolor eu nunc. Nulla nec laoreet odio. Aliquam suscipit porta blandit.
        </p>
        <p>
          Donec imperdiet vehicula neque quis mattis. Maecenas commodo, turpis id volutpat
          convallis, tortor magna pharetra velit, maximus auctor nisl lorem et velit. Vivamus
          aliquam eget urna consequat vulputate. Donec lacus arcu, faucibus ac semper sit amet,
          sagittis sit amet libero. Cras sollicitudin ultrices odio quis rutrum. Sed non tristique
          ante. Maecenas a lacus turpis. Sed imperdiet, velit in porttitor tincidunt, sapien odio
          dictum sem, dignissim dictum lacus dui iaculis tellus. Morbi tristique pellentesque purus
          quis mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia Curae; Morbi et ex mollis, gravida nibh a, faucibus lorem. Donec eleifend purus id
          blandit maximus. Sed egestas elit ut urna semper imperdiet.
        </p>
      </Fragment>
    );
  }
}
