import {
  Position,
  type Align,
  type Viewport,
  type XYPosition,
} from "@xyflow/react";

export function getEdgeToolbarTransform(
  xyPosition: XYPosition,
  viewport: Viewport,
  position: Position,
  offset: number,
  align: Align
): string {
  let alignmentOffset = 0.5;

  if (align === "start") {
    alignmentOffset = 0;
  } else if (align === "end") {
    alignmentOffset = 1;
  }

  /*
   * position === Position.Top
   * we set the x any y position of the toolbar based on the edges position
   */
  let pos = [
    xyPosition.x * viewport.zoom + viewport.x,
    xyPosition.y * viewport.zoom + viewport.y - offset,
  ];
  // and than shift it based on the alignment. The shift values are in %.
  let shift = [-100 * alignmentOffset, -100];

  switch (position) {
    case Position.Right:
      pos = [
        xyPosition.x * viewport.zoom + viewport.x + offset,
        xyPosition.y * viewport.zoom + viewport.y,
      ];
      shift = [0, -100 * alignmentOffset];
      break;
    case Position.Bottom:
      pos[1] = xyPosition.y * viewport.zoom + viewport.y + offset;
      shift[1] = 0;
      break;
    case Position.Left:
      pos = [
        xyPosition.x * viewport.zoom + viewport.x - offset,
        xyPosition.y * viewport.zoom + viewport.y,
      ];
      shift = [-100, -100 * alignmentOffset];
      break;
  }

  return `translate(${pos[0]}px, ${pos[1]}px) translate(${shift[0]}%, ${shift[1]}%)`;
}
