import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase.tsx";
import type { CFactNode as CFactNodeType } from "./cFact.types.ts";

const CFactNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
}: NodeProps<CFactNodeType>) => {
  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      draggable={draggable}
      type="c_fact"
      actions={[
        "delete",
        "changeColor",
        "attachNode",
        "toggleHandlesVisibility",
      ]}
    />
  );
};

export default CFactNode;
