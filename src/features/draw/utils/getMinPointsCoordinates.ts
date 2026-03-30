import type { Vec2 } from "perfect-freehand";

const getMinPointsCoordinates = (points: Vec2[]) => {
  const minX = Math.min(...points.map((p) => p[0]));
  const minY = Math.min(...points.map((p) => p[1]));

  return [minX, minY];
};

export default getMinPointsCoordinates;
