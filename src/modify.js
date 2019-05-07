import define from './define';

export default event => {
  const { clientX: x, clientY: y, identifier: id } = event.touches ? event.touches[0] : event;
  const pointerId = define(id, null);
  const result = { pointerId, x, y };
  return result;
};
