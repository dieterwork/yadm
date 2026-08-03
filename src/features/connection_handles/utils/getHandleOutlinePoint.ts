import { Position, type XYPosition } from "@xyflow/react";
import clamp from "$/shared/utils/clamp";
import handleOutlineMap, { hasHandleOutline } from "./handleOutlineMap";

const getHandleOutlinePoint = ({
  type,
  position,
  offset,
  width,
  height,
}: {
  type?: string;
  position: Position;
  offset: number;
  width?: number;
  height?: number;
}): XYPosition | null => {
  if (!hasHandleOutline(type) || !width || !height) return null;

  const outline = handleOutlineMap[type](width, height);

  // the offset runs along the main axis, the outline decides the cross axis
  const isMainAxisX = position === Position.Top || position === Position.Bottom;
  const getMain = (point: XYPosition) => (isMainAxisX ? point.x : point.y);
  const getCross = (point: XYPosition) => (isMainAxisX ? point.y : point.x);
  const toPoint = (main: number, cross: number) =>
    isMainAxisX ? { x: main, y: cross } : { x: cross, y: main };

  // a point on the far side of the shape would be inside it, the one closest
  // to the side the handle belongs to is the one to keep
  const isLeading = position === Position.Top || position === Position.Left;

  const mainValues = outline.flat().map(getMain);
  // an offset outside the shape (it is measured on the bounding box, which can
  // be wider than the shape) lands on the shape's outermost point
  const target = clamp(
    offset * (isMainAxisX ? width : height),
    Math.min(...mainValues),
    Math.max(...mainValues),
  );

  // the point is where the line at the offset crosses the outline, every part
  // of it is closed so there are always at least two crossings to choose from
  let crossing: number | null = null;
  for (const part of outline) {
    for (let index = 0; index < part.length; index++) {
      const from = part[index];
      const to = part[(index + 1) % part.length];
      const [fromMain, toMain] = [getMain(from), getMain(to)];
      if (
        (fromMain < target && toMain < target) ||
        (fromMain > target && toMain > target)
      )
        continue;

      const ratio =
        fromMain === toMain ? 0 : (target - fromMain) / (toMain - fromMain);
      const cross = getCross(from) + ratio * (getCross(to) - getCross(from));

      if (
        crossing === null ||
        (isLeading ? cross < crossing : cross > crossing)
      )
        crossing = cross;
    }
  }

  return crossing === null ? null : toPoint(target, crossing);
};

export default getHandleOutlinePoint;
