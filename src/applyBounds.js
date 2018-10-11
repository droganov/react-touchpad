const limit = (n, min, max) => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
};

export default ({ x, y }, { top, left, bottom, right }) => ({
  x: limit(x, left, right),
  y: limit(y, top, bottom),
});
