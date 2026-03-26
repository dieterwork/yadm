import type { Viewport } from "@xyflow/react";
import { setViewport } from "../useDEMOModelerStore";

const onViewportChange = (viewport: Viewport) => {
  setViewport(viewport);
};

export default onViewportChange;
