import useShortcut from "$/features/keyboard/useShortcut";
import { useReactFlow } from "@xyflow/react";

const useZoomShortcut = () => {
  const { zoomIn, zoomOut } = useReactFlow();

  useShortcut(["Control+Minus", "Meta+Minus"], () =>
    zoomOut({ duration: 500 })
  );

  useShortcut(["Control+Equal", "Meta+Equal"], () => zoomIn({ duration: 500 }));
};

export default useZoomShortcut;
