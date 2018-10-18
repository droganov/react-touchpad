import ease from 'eases/circ-in';

const getY = (node) => {
  const { height, top } = node.getBoundingClientRect();
  return height / 2 + top;
};

export default (wrap, ghost) => {
  const { height, top } = wrap.getBoundingClientRect();
  const ghostY = getY(ghost);

  const size = height / 2;
  const diff = ghostY - size - top;
  const factor = diff / size * -1;
  const absFactor = Math.min(Math.abs(factor), 1);
  const modifiedFactor = ease(absFactor) * Math.sign(factor);

  return modifiedFactor;
};
