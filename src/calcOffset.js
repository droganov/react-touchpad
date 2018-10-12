export default ({ firstX, firstY, lastX, lastY, currentX, currentY }) => ({
  x: lastX + (currentX - firstX),
  y: lastY + (currentY - firstY),
});
