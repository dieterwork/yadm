import { useEffect } from "react";
import {
  setNodes,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";

const useSelectShortcut = () => {
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);
  const action = useDEMOModelerStore((state) => state.action);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (!isEnabled) return;
      if (action === "edit") return;
      if (!(e.ctrlKey || e.metaKey)) return;
      if (e.key !== "a") return;
      e.preventDefault();
      setNodes((nodes) => nodes.map((n) => ({ ...n, selected: true })));
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isEnabled, action]);
};

export default useSelectShortcut;
