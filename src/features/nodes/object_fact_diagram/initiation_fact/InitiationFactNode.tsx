import { type NodeProps } from "@xyflow/react";

import DEMONodePrimitive from "../../DEMONodePrimitive.tsx";
import type { InitiationFactNode as InitiationFactNodeType } from "./initiationFact.types.ts";

const InitiationFactNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<InitiationFactNodeType>) => {
  return (
    <>
      <DEMONodePrimitive
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="initiation_fact"
      />
    </>
  );
};

export default InitiationFactNode;
