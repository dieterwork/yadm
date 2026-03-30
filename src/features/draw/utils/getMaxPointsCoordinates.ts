import type { Vec2 } from "perfect-freehand";

const getMaxPointsCoordinates = (points: Vec2[]) => {
  const maxX = Math.max(...points.map((p) => p[0]));
  const maxY = Math.max(...points.map((p) => p[1]));

  return [maxX, maxY];
};

export default getMaxPointsCoordinates;
