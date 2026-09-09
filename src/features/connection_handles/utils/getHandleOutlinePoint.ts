import { Position, type XYPosition } from "@xyflow/react";
import handleOutlineMap, { hasHandleOutline } from "./handleOutlineMap";

const wrap = (value: number, period: number) =>
  ((value % period) + period) % period;

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

  const mainValues = outline.flat().map(getMain);
  const minMain = Math.min(...mainValues);
  const maxMain = Math.max(...mainValues);
  const span = maxMain - minMain;

  // The offset sweeps the whole outline instead of stopping at its ends: the
  // first half of a sweep runs along the side the handle belongs to, the second
  // half comes back along the opposite one, so dragging past a corner keeps
  // rotating the handle around the shape.
  const swept = span
    ? wrap(offset * (isMainAxisX ? width : height) - minMain, 2 * span)
    : 0;
  const isReturning = swept > span;
  const target = minMain + (isReturning ? 2 * span - swept : swept);

  const isLeading =
    (position === Position.Top || position === Position.Left) !== isReturning;

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
