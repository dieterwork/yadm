export enum Algorithm {
  Linear = "Linear",
  CatmullRom = "Catmull-Rom",
  BezierCatmullRom = "Bezier Catmull-Rom",
  SmoothStep = "Smooth Step",
}

export const COLORS = {
  [Algorithm.Linear]: "#0375ff",
  [Algorithm.BezierCatmullRom]: "#68D391",
  [Algorithm.CatmullRom]: "#FF0072",
  [Algorithm.SmoothStep]: "#FF0072",
};

export const DEFAULT_ALGORITHM = "Smooth Step";
