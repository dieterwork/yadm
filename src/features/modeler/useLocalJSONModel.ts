import { useEffect } from "react";
import { setEdges, setEnabled, setNodes } from "./useDEMOModelerStore";
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
      setEnabled(localDEMOModel.isEnabled);
      console.log(`[Loaded version ${localDEMOModel.version}]`);
    }
  }, []);
};

export default useLocalJSONModel;
