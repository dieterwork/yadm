/** Convert absolute coordinates to parent relative coordinates */
export const convertAbsoluteToParentRelativePosition = ({
  absolutePosition,
  parentAbsolutePosition,
}: {
  absolutePosition: { x: number; y: number };
  parentAbsolutePosition: { x: number; y: number };
}) => {
  return {
    x: absolutePosition.x - parentAbsolutePosition.x,
    y: absolutePosition.y - parentAbsolutePosition.y,
  };
};
