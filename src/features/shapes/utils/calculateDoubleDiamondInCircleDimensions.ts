// 2 * circleWidth - offset * circleWidth =
//circleWidth * (2 - offset) = width

export const calculateDoubleDiamondInCircleDimensions = (
  circleWidth: number,
  offset: number = 1 / 8
) => {
  // get circleWidth and offsetWidth
  return {
    width: circleWidth * (1 + offset),
    height: circleWidth,
  };
};
