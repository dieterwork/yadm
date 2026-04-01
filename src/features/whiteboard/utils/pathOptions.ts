import type { StrokeOptions } from "perfect-freehand";

const pathOptions = {
  size: 7,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t: number) => t,
  start: {
    taper: 0,
    easing: (t: number) => t,
    cap: true,
  },
  end: {
    taper: 0.1,
    easing: (t: number) => t,
    cap: true,
  },
} satisfies StrokeOptions;

export default pathOptions;
