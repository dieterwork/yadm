export const getCurrentFocusedText = () => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  if (!selection || !range) return null;

  selection.modify("move", "backward", "lineboundary");
  selection.modify("extend", "forward", "lineboundary");

  const html = document.createElement("div");

  for (let i = 0; i < selection.rangeCount; i++) {
    html.appendChild(selection.getRangeAt(i).cloneContents());
  }

  selection.removeAllRanges();
  selection.addRange(range);

  const innerHTML = html.innerHTML;
  html.remove();
  return innerHTML;
};
