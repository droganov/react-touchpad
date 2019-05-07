export default (node) => {
  const { width } = node.getBoundingClientRect();
  const { scrollWidth } = node.childNodes[0];
  return {
    left: width - scrollWidth,
    right: 0,
  };
};
