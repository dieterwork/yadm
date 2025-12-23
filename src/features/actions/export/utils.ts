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
