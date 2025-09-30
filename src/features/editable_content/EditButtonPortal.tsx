import { useStore } from "@xyflow/react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const EditButtonPortal = ({ children }: { children: ReactNode }) => {
  const wrapperRef = useStore((state) =>
    state.domNode?.querySelector(".react-flow__renderer")
  );

  if (!wrapperRef) {
    return null;
  }

  return createPortal(children, wrapperRef);
};

export default EditButtonPortal;
