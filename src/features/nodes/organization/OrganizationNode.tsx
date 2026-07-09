import { type NodeProps } from "@xyflow/react";

import type { OrganizationNode as OrganizationNodeType } from "../nodes.types";
import DEMONodeBase from "../DEMONodeBase";
import OrganizationLabel from "./OrganizationLabel";

const OrganizationNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
}: NodeProps<OrganizationNodeType>) => {
  const { actions, content, isEditable, fontSize } = data;

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      draggable={draggable}
      type="organization"
      actions={actions ?? ["changeColor", "changeFontSize", "editText"]}
    >
      <OrganizationLabel
        content={content?.body}
        isEditable={isEditable}
        fontSize={fontSize}
        width={width}
      />
    </DEMONodeBase>
  );
};

export default OrganizationNode;
