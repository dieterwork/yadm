import type { DEMONode } from "$/features/nodes/nodes.types";
import { getNodesBounds, getViewportForBounds } from "@xyflow/react";
import { toPng } from "html-to-image";

export const downloadFile = (dataUrl: string, fileName: string) => {
  const a = document.createElement("a");
  a.setAttribute("download", fileName);
  a.setAttribute("href", dataUrl);
  a.click();
  a.remove();
};

export const generatePNG = async (
  nodes: DEMONode[],
  scaleFactor: number = 1
) => {
  const nodesBounds = getNodesBounds(nodes);
  const padding = scaleFactor * 10;
  const imageWidth = nodesBounds.width * scaleFactor + padding;
  const imageHeight = nodesBounds.height * scaleFactor + padding;
  const viewport = getViewportForBounds(
    nodesBounds,
    imageWidth,
    imageHeight,
    1 * scaleFactor,
    1 * scaleFactor,
    padding
  );

  const viewportDomEl = document.querySelector(
    ".react-flow__viewport"
  ) as HTMLDivElement;

  return await toPng(viewportDomEl, {
    backgroundColor: "#ffffff",
    width: imageWidth,
    height: imageHeight,
    style: {
      width: String(imageWidth),
      height: String(imageHeight),
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
    },
  }).then((dataUrl) => {
    return { url: dataUrl, width: imageWidth, height: imageHeight };
  });
};
