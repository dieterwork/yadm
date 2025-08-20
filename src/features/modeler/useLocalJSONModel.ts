import type { Edge, ReactFlowJsonObject } from "@xyflow/react";
import { useEffect } from "react";
import type { DEMONode } from "../nodes/nodes.types";
import { useDEMOModeler } from "./useDEMOModeler";

const useLocalJSONModel = () => {
  const setModelFromJSONObject = useDEMOModeler(
    (state) => state.setModelFromJSONObject
  );
  useEffect(() => {
    const localDEMOModelJSON = localStorage.getItem("demo-model");
    if (!localDEMOModelJSON) return;
    const localDEMOModel: ReactFlowJsonObject<DEMONode, Edge> =
      JSON.parse(localDEMOModelJSON);
    setModelFromJSONObject(localDEMOModel);
  }, []);
};

export default useLocalJSONModel;
