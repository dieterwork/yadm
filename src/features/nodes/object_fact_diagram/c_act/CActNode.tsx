import { type NodeProps } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase.tsx";
import type { CActNode as CActNodeType } from "./cAct.types.ts";

const CActNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<CActNodeType>) => {
  return (
    <>
      <DEMONodeBase
        id={id}
        data={data}
        selected={selected}
        width={width}
        height={height}
        type="c_act"
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

export default CActNode;
