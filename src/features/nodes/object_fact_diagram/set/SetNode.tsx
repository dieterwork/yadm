import { type NodeProps, type OnResize } from "@xyflow/react";

import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
import getChildNodes from "../../utils/getChildNodes";
import {
  getNode,
  updateNode,
  useDEMOModelerStore,
} from "$/features/modeler/store/useDEMOModelerStore";
import type { SetNode as SetNodeType } from "../objectFactDiagram.types";

const SetNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<SetNodeType>) => {
  const nodes = useDEMOModelerStore((state) => state.nodes);

  const { actions } = data;
  const node = getNode(id);
  if (!node) return null;

  const defaultActions: NodeToolbarAction[] = [].concat(
    parentId ? ["attachNode"] : [],
  );

  const onResize: OnResize = (_, { width, height }) => {
    // always have entity types as children so no need to check for node type
    const childNodes = getChildNodes([node], nodes);
    const parentEntityType = childNodes.find((node) => node.parentId === id);
    const childEntityType = childNodes.find(
      (node) => node.parentId === parentEntityType?.id,
    );
    console.log(parentEntityType, childEntityType);

    if (!parentEntityType || !childEntityType) {
      return;
    }

    updateNode(parentEntityType.id, (node) => ({
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

    updateNode(childEntityType.id, (node) => ({
      ...node,
      position: {
        x: width / 2 - (width - 20) / 2,
        y: height / 2 - (height - 20) / 2,
      },
      extent: [
        [width / 2 - (width - 20) / 2, height / 2 - (height - 20) / 2],
        [width / 2 + (width - 20) / 2, height / 2 + (height - 20) / 2],
      ],
      style: {
        ...node.style,
        width: width - 20,
        height: height - 20,
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
      type="set"
      draggable={draggable}
      actions={actions ?? defaultActions}
      resizerProps={{ onResize }}
    />
  );
};

export default SetNode;
