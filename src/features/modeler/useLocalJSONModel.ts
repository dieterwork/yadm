import type { ReactFlowJsonObject } from "@xyflow/react";
import { useEffect } from "react";
import type { DEMONode } from "../nodes/nodes.types";
import { setEdges, setNodes } from "./useDEMOModelerStore";
import type { DEMOEdge } from "../edges/edges.types";

let didInit = false;
const useLocalJSONModel = () => {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      const localDEMOModelJSON = localStorage.getItem("demo-model");
      if (!localDEMOModelJSON) return;
      const localDEMOModel: ReactFlowJsonObject<DEMONode, DEMOEdge> =
        JSON.parse(localDEMOModelJSON);
      setNodes(localDEMOModel.nodes);
      setEdges(localDEMOModel.edges);
    }
  }, []);
};

export default useLocalJSONModel;
