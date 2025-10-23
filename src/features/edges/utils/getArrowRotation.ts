import type { XYPosition } from "@xyflow/react";

const getArrowRotation = ({
  source,
  target,
  interactiveEdgeDirection,
}: {
  source: XYPosition;
  target: XYPosition;
  interactiveEdgeDirection: "horizontal" | "vertical" | undefined;
}) => {
  const angle = Math.atan2(source.y - target.y, source.x - target.x) + Math.PI;

  if (interactiveEdgeDirection) {
    const modulo = angle % Math.PI;
    if (interactiveEdgeDirection === "vertical") {
      if (modulo < Math.PI / 2) {
        return Math.floor(angle / (Math.PI / 2)) * (Math.PI / 2) + Math.PI * 2;
      } else if (modulo > Math.PI / 2) {
        return Math.ceil(angle / (Math.PI / 2)) * (Math.PI / 2) + Math.PI * 2;
      } else if (modulo === angle) {
        return angle;
      }
    } else {
      const roundedModulo = Math.floor(modulo * 1000) / 1000;
      const roundedPi = Math.floor(Math.PI * 1000) / 1000;
      if (roundedModulo === 0 || roundedPi === roundedModulo) {
        return angle;
      } else if (modulo < Math.PI && modulo > Math.PI / 2) {
        return Math.floor(angle / (Math.PI / 2)) * (Math.PI / 2) + Math.PI * 2;
      } else if (modulo > 0 && modulo < Math.PI / 2) {
        return Math.ceil(angle / (Math.PI / 2)) * (Math.PI / 2) + Math.PI * 2;
      }
    }
  } else {
    // otherwise, round to nearest 90 deg
    const newAngle = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
    return newAngle;
  }
};

export default getArrowRotation;
