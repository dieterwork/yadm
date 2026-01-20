import convertWhitePixelsToTransparentPixels from "$/shared/utils/convertWhitePixelsToTransparentPixels";
import { getViewportForBounds, type Rect } from "@xyflow/react";
import { toPng } from "html-to-image";

export const downloadFile = (dataUrl: string, fileName: string) => {
  const a = document.createElement("a");
  a.setAttribute("download", fileName);
  a.setAttribute("href", dataUrl);
  a.click();
  a.remove();
};

export const generatePNG = async ({
  nodesBounds,
  backgroundColor = "#fff",
  scaleFactor = 1,
}: {
  nodesBounds: Rect;
  backgroundColor?: string;
  scaleFactor?: number;
}) => {
  const PADDING = 10;

  // offset for edges is 30, so we need to account for that
  const bounds: Rect = {
    x: nodesBounds.x - 30,
    y: nodesBounds.y - 30,
    width: nodesBounds.width + 60,
    height: nodesBounds.height + 60,
  };

  const imageWidth = scaleFactor * (bounds.width + PADDING);
  const imageHeight = scaleFactor * (bounds.height + PADDING);

  const viewport = getViewportForBounds(
    bounds,
    imageWidth,
    imageHeight,
    1 * scaleFactor,
    1 * scaleFactor,
    PADDING
  );

  const viewportDomEl = document.querySelector(
    ".react-flow__viewport"
  ) as HTMLDivElement;

  const dataUrl = await toPng(viewportDomEl, {
    backgroundColor: backgroundColor,
    width: imageWidth,
    height: imageHeight,
    style: {
      width: String(imageWidth),
      height: String(imageHeight),
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
    },
    quality: 100,
  });
  const image = new Image();
  await new Promise((res, rej) => {
    image.src = dataUrl;
    image.onload = () => res(image);
    image.onerror = () => rej(image);
  });
  const imgBlob = await convertWhitePixelsToTransparentPixels(image);
  const newUrl = URL.createObjectURL(imgBlob);
  return { url: newUrl, width: imageWidth, height: imageHeight };
};
