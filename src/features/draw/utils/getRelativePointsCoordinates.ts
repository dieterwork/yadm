import type { Vec2 } from "perfect-freehand";
import getMinPointsCoordinates from "./getMinPointsCoordinates";

const getRelativeStrokeCoordinates = (
  points: Vec2[],
  zoom: number = 1
): Vec2[] => {
  const [minX, minY] = getMinPointsCoordinates(points);

  return points.map((p) => [p[0] - minX, p[1] - minY]);
};

export default getRelativeStrokeCoordinates;
