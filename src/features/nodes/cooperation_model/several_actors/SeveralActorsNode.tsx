import { type NodeProps, type OnResize } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { SeveralActorsNode as SeveralActorsNodeType } from "./severalActors.types";
import { calculateDoubleDiamondInCircleDimensions } from "../../../shapes/utils/calculateDoubleDiamondInCircleDimensions";

import {
  getNode,
  updateNode,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import getChildNodes from "../../utils/getChildNodes";

const SeveralActorsNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<SeveralActorsNodeType>) => {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const node = getNode(id);

  const onResize: OnResize = (_, { width, height }) => {
    const childNodes = getChildNodes([node], nodes);
    const transaction = childNodes.find((node) => node.type === "transaction");
    const actor = childNodes.find((node) => node.type === "actor");
    if (
      !transaction ||
      !transaction.style?.width ||
      !transaction.style.height ||
      !actor
    )
      return;
    const transactionSize = calculateDoubleDiamondInCircleDimensions(
      +transaction.style.width
    );
    const transactionHeight = +transaction.style.height;
    updateNode(transaction.id, {
      extent: [
        [width / 2 - transactionSize.width / 2, 0],
        [width / 2 + transactionSize.width / 2, transactionHeight],
      ],
      position: {
        x: 0,
        y: 0,
      },
    });
    updateNode(actor.id, (node) => ({
      ...node,
      position: {
        x: width,
        y: transactionHeight / 2,
      },
      extent: [
        [0, transactionHeight / 2],
        [width, height],
      ],
      style: {
        ...node.style,
        width,
        height: height - transactionHeight / 2,
      },
    }));
  };

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="several_actors"
      actions={["delete"]}
      resizerProps={{ onResize }}
    />
  );
};

export default SeveralActorsNode;
