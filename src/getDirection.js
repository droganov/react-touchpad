import last from 'lodash/last';

export default ({ x, y }, history) => {
  const prev = last(history);
  if (!prev) return null;
  const diffX = Math.abs(prev.x - x);
  const diffY = Math.abs(prev.y - y);
  if (diffX > diffY) return 'horizontal';
  if (diffX < diffY) return 'vertical';
  return null;
};
