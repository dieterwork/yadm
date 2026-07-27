import { type NodeProps, type OnResize } from "@xyflow/react";

import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
import type { SelfActivationNode as SelfActivationNodeType } from "./selfActivation.types";
import getChildNodes from "../../utils/getChildNodes";
import {
  getNode,
  updateNode,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";

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

  const defaultActions: NodeToolbarAction[] = [].concat(
    parentId ? ["attachNode"] : [],
  );

  const onResize: OnResize = (_, { width, height }) => {
    const childNodes = getChildNodes([node], nodes);
    const transaction = childNodes.find((node) => node.type === "transaction");
    const actor = childNodes.find((node) => node.type === "actor");

    if (
      !actor ||
      !transaction ||
      !transaction.style?.width ||
      !transaction.style?.height
    )
      return;

    const transactionWidth = +transaction.style.width;
    const transactionHeight = +transaction.style.height;

    updateNode(actor.id, (node) => ({
      ...node,
      position: { x: 0, y: 0 },
      extent: [
        [0, 0],
        [width, height],
      ],
      style: {
        ...node.style,
        width,
        height,
      },
    }));

    updateNode(transaction.id, {
      position: {
        x: width / 2 - transactionWidth / 2,
        y: height / 2 - transactionHeight / 2,
      },
      extent: [
        [width / 2 - transactionWidth / 2, height / 2 - transactionHeight / 2],
        [width / 2 + transactionWidth / 2, height / 2 + transactionHeight / 2],
      ],
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
