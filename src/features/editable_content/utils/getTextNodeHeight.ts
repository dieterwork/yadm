export default function getTextNodeHeight(node: Node) {
  if (!node.TEXT_NODE) throw new Error("Not a text node");
  const range = document.createRange();
  range.selectNodeContents(node);
  const rect = range.getBoundingClientRect();
  const height = rect.bottom - rect.top;
  return height;
}
