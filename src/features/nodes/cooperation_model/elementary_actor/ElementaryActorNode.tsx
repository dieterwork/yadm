import { type NodeProps, type OnResize } from "@xyflow/react";

import DEMONodeBase from "../../DEMONodeBase";
import type { ElementaryActorNode as ElementaryActorNodeType } from "./elementaryActor.types";
import uuid from "../../../../shared/utils/uuid";
import EditableContent from "../../../editable_content/EditableContent";
import { DEFAULT_SIZE_MAP } from "../../utils/consts";
import {
  getNode,
  updateNode,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import getChildNodes from "../../utils/getChildNodes";

const padding = 4;

const ElementaryActorNode = ({
  id,
  data,
  selected,
  width,
  height,
  dragHandle,
  draggable,
  parentId,
}: NodeProps<ElementaryActorNodeType>) => {
  const nodes = useDEMOModelerStore((state) => state.nodes);
  const node = getNode(id);

  const onResize: OnResize = (_, { width, height }) => {
    const childNodes = getChildNodes([node], nodes);
    const transaction = childNodes.find((node) => node.type === "transaction");
    const actor = childNodes.find((node) => node.type === "actor");

    if (
      !transaction ||
      !transaction?.style?.width ||
      !transaction?.style?.height ||
      !actor
    )
      return;

    const transactionWidth = +transaction?.style?.width;
    const transactionHeight = +transaction?.style?.height;

    updateNode(transaction.id, {
      extent: [
        [width / 2 - transactionWidth / 2, 0],
        [width / 2 + transactionWidth / 2, transactionHeight],
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
      draggable={draggable}
      width={width}
      height={height}
      type="elementary_actor"
      actions={["delete"].concat(parentId ? "attachNode" : [])}
      resizerProps={{ onResize }}
      dragHandle={!!dragHandle}
    />
  );
};

export default ElementaryActorNode;
