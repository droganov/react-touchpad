const getDistance = (n, min, max) => {
  if (n < min) return min - n;
  if (n > max) return n - max;
  return 1;
};

const interpolate = (n, min, max, elasticity) => {
  const diff = getDistance(n, min, max);
  const distanceFactor = diff - (diff ** elasticity);
  const absN = Math.abs(n);
  return (absN - distanceFactor) * Math.sign(n);
};

export default ({ x, y }, { top, left, bottom, right }, elasticity) => ({
  x: interpolate(x, left, right, elasticity),
  y: interpolate(y, top, bottom, elasticity),
});
