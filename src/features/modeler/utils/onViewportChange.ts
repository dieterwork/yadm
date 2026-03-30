import type { Viewport } from "@xyflow/react";
import { setViewport } from "../store/useDEMOModelerStore";

const onViewportChange = (viewport: Viewport) => {
  setViewport(viewport);
};

export default onViewportChange;
