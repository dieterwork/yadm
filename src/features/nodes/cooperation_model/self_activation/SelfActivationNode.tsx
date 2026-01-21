import {
  type CoordinateExtent,
  type NodeProps,
  type OnResize,
  type XYPosition,
} from "@xyflow/react";

import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
import type { SelfActivationNode as SelfActivationNodeType } from "./selfActivation.types";
import getChildNodes from "../../utils/getChildNodes";
import {
  getNode,
  updateNode,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";

const SelfActivationNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<SelfActivationNodeType>) => {
  const { actions } = data;
  const node = getNode(id);
  const nodes = useDEMOModelerStore((state) => state.nodes);

  const defaultActions: NodeToolbarAction[] = [
    "addHandle",
    "changeColor",
    "changeFontSize",
    "toggleHandlesVisibility",
    "changeState",
    "editText",
  ];

  if (parentId) {
    defaultActions.push("attachNode");
  }

  const onResize: OnResize = (_, { width, height }) => {
    const childNodes = getChildNodes([node], nodes);
    const transaction = childNodes.find((node) => node.type === "transaction");

    if (
      !transaction ||
      !transaction?.measured?.width ||
      !transaction?.measured?.height
    )
      return;

    const transactionWidth = transaction.measured.width;
    const transactionHeight = transaction.measured.height;

    const extent: CoordinateExtent = [
      [width / 2 - transactionWidth / 2, height / 2 - transactionHeight / 2],
      [width / 2 + transactionWidth / 2, height / 2 + transactionHeight / 2],
    ];

    const position: XYPosition = {
      x: width / 2 - transactionWidth / 2,
      y: height / 2 - transactionHeight / 2,
    };

    updateNode(transaction.id, {
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
      type="self_activation"
      draggable={draggable}
      actions={actions ?? defaultActions}
      resizerProps={{ onResize }}
    />
  );
};

export default SelfActivationNode;
