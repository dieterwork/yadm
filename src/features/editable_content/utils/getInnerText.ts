import { searchNode } from "./searchNode";

export function getInnerText(container: Node) {
  const buffer: string[] = [];
  searchNode(container, container, (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      buffer.push((node as Text).data);
    }
    return false;
  });
  return buffer.join("");
}
