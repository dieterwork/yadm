import {
  type CoordinateExtent,
  type NodeProps,
  type OnResize,
  type XYPosition,
} from "@xyflow/react";

import type { TransactionNode as TransactionNodeType } from "./transaction.types";
import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import {
  getNode,
  updateNode,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";

const TransactionNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<TransactionNodeType>) => {
  const { content, fontSize, isEditable, actions, resizable } = data;
  const selfActivationNode = parentId
    ? getNode(parentId, (node) => node.type === "self_activation")
    : null;

  const defaultActions: NodeToolbarAction[] = [
    "addHandle",
    "changeColor",
    "changeFontSize",
    "toggleHandlesVisibility",
    "changeScope",
    "editText",
    "changeState",
  ];

  if (parentId) {
    defaultActions.push("attachNode");
  }

  const onResize: OnResize = (_, { width, height }) => {
    // Check if has parent
    if (
      !selfActivationNode ||
      !selfActivationNode.measured?.width ||
      !selfActivationNode.measured?.height
    )
      return;

    // If it does, update position

    const extent: CoordinateExtent = [
      [
        selfActivationNode.measured.width / 2 - width / 2,
        selfActivationNode.measured.height / 2 - height / 2,
      ],
      [
        selfActivationNode.measured.width / 2 + width / 2,
        selfActivationNode.measured.height / 2 + height / 2,
      ],
    ];

    const position: XYPosition = {
      x: selfActivationNode.measured.width / 2 - width / 2,
      y: selfActivationNode.measured.height / 2 - height / 2,
    };

    updateNode(id, {
      position,
      extent,
    });
  };

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="transaction"
      keepAspectRatio={true}
      actions={actions ?? defaultActions}
      resizable={resizable}
      draggable={draggable}
      resizerProps={{
        onResize,
        maxWidth: selfActivationNode?.width,
        maxHeight: selfActivationNode?.height,
      }}
    >
      <EditableContent
        isSelected={selected}
        isEditable={isEditable && data.state !== "unclear"}
        content={content}
        width={data.state === "double" ? height : width}
        height={height}
        fontSize={fontSize}
        hide={data.state === "unclear"}
        maxLength={75}
        maxLines={4}
        style={{ right: data.state === "double" ? "auto" : 0 }}
      />
    </DEMONodeBase>
  );
};

export default TransactionNode;
