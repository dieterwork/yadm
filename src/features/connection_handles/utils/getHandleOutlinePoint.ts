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

  const isMainAxisX = position === Position.Top || position === Position.Bottom;
  const getMain = (point: XYPosition) => (isMainAxisX ? point.x : point.y);
  const getCross = (point: XYPosition) => (isMainAxisX ? point.y : point.x);
  const toPoint = (main: number, cross: number) =>
    isMainAxisX ? { x: main, y: cross } : { x: cross, y: main };

  const isLeading = position === Position.Top || position === Position.Left;

  const mainValues = outline.flat().map(getMain);
  const target = clamp(
    offset * (isMainAxisX ? width : height),
    Math.min(...mainValues),
    Math.max(...mainValues),
  );

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
