export default (node) => {
  const { height, width } = node.getBoundingClientRect();
  const { scrollHeight } = node;
  const { scrollWidth } = node.childNodes[0];
  return {
    top: height - scrollHeight,
    bottom: 0,
    left: width - scrollWidth,
    right: 0,
    width,
  };
};
