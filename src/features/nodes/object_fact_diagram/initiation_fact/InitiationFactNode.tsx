import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase.tsx";
import type { InitiationFactNode as InitiationFactNodeType } from "./initiationFact.types.ts";

const InitiationFactNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
}: NodeProps<InitiationFactNodeType>) => {
  return (
    <>
      <DEMONodeBase
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        draggable={draggable}
        resizable={false}
        type="initiation_fact"
        actions={[
          "delete",
          "changeColor",
          "attachNode",
          "toggleHandlesVisibility",
        ]}
      />
    </>
  );
};

export default InitiationFactNode;
