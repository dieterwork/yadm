import { walkThroughNodes } from "./walkThroughNodes";

export const getCaretPosition = (elem: HTMLElement) => {
  const sel = window.getSelection();
  if (!sel) throw new Error("Selection not found");
  var cum_length = [0, 0];

  if (sel.anchorNode == elem) cum_length = [sel.anchorOffset, sel.focusOffset];
  else {
    var nodes_to_find = [sel.anchorNode, sel.focusNode];
    if (!elem.contains(sel.anchorNode) || !elem.contains(sel.focusNode))
      return undefined;
    else {
      var found: [number | boolean, number | boolean] = [0, 0];
      var i;
      walkThroughNodes(elem, function (node) {
        for (i = 0; i < 2; i++) {
          if (node == nodes_to_find[i]) {
            found[i] = true;
            if (found[i == 0 ? 1 : 0]) return false; // all done
          }
        }

        if (node.textContent && !node.firstChild) {
          for (i = 0; i < 2; i++) {
            if (!found[i]) cum_length[i] += node.textContent.length;
          }
        }
      });
      cum_length[0] += sel.anchorOffset;
      cum_length[1] += sel.focusOffset;
    }
  }
  if (cum_length[0] <= cum_length[1]) return cum_length;
  return [cum_length[1], cum_length[0]];
};
