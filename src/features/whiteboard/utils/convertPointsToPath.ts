import getStroke from "perfect-freehand";
import getSvgPathFromStroke from "./getSvgPathFromStroke";
import pathOptions from "./pathOptions";

const convertPointsToPath = (
  points: [number, number, number][],
  zoom: number = 1
) => {
  const stroke = getStroke(points, {
    ...pathOptions,
    size: pathOptions.size * zoom,
  });
  return getSvgPathFromStroke(stroke);
};

export default convertPointsToPath;
