export default (offset, distance, impulse) => {
  const velX = distance.x * impulse;
  const velY = distance.y * impulse;

  return {
    x: offset.x + velX,
    y: offset.y + velY,
  };
};
