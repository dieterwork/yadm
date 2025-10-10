import { useEffect } from "react";
import { setEdges, setNodes } from "./useDEMOModelerStore";
import type { DEMOModelJSON } from "$/shared/types/reactFlow.types";

let didInit = false;
const useLocalJSONModel = () => {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      const localDEMOModelJSON = localStorage.getItem("demo-model");
      if (!localDEMOModelJSON) return;
      const localDEMOModel: DEMOModelJSON = JSON.parse(localDEMOModelJSON);
      setNodes(localDEMOModel.nodes);
      setEdges(localDEMOModel.edges);
    }
  }, []);
};

export default useLocalJSONModel;
