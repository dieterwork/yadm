import { useStore } from "@xyflow/react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const EdgeToolbarPortal = ({ children }: { children: ReactNode }) => {
  const wrapperRef = useStore((state) =>
    state.domNode?.querySelector(".react-flow__renderer")
  );

  if (!wrapperRef) {
    return null;
  }

  return createPortal(children, wrapperRef);
};

export default EdgeToolbarPortal;
