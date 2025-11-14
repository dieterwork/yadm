import { type NodeProps } from "@xyflow/react";

import type { OrganizationNode as OrganizationNodeType } from "../nodes.types";
import DEMONodeBase from "../DEMONodeBase";

const OrganizationNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
}: NodeProps<OrganizationNodeType>) => {
  const { actions } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      draggable={draggable}
      type="organization"
      actions={actions ?? ["delete", "changeState", "changeColor"]}
    />
  );
};

export default OrganizationNode;
