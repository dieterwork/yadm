export const rectToBox = ({ x, y, width, height }: Rect): Box => ({
  x,
  y,
  x2: x + width,
  y2: y + height,
});

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Box = { x: number; y: number; x2: number; y2: number };
