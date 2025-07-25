export const DEFAULT_FILL_OPACITY = 0.2;

// this util functions generates an svg path from a list of points
export function generatePath(points: number[][]) {
  const path = points.map(([x, y]) => `${x},${y}`).join(" L");
  return `M${path} Z`;
}

// 2 * circleWidth - offset * circleWidth =
//circleWidth * (2 - offset) = width

export const calculateDoubleDiamondInCircleDimensions = (
  circleWidth: number,
  offset: number = 1 / 8
) => {
  // get circleWidth and offsetWidth
  return (2 - offset) * circleWidth;
};
