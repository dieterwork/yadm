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
} from "$/features/modeler/store/useDEMOModelerStore";
import { cn } from "tailwind-variants";
import EditableContent from "$/features/editable_content/EditableContent";
import { useState } from "react";

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

  const { content, fontSize, isEditable } = data;

  const [activeEl, setActiveEl] = useState<"header" | "body" | null>(null);

  const defaultActions: NodeToolbarAction[] = [
    "bringToFront",
    "sendToBack",
    "addHandle",
    "changeColor",
    "changeFontSize",
    "toggleHandlesVisibility",
    "changeFocus",
    "editText",
  ].concat(parentId ? ["attachNode"] : []);

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
    >
      <div className="grid grid-rows-[1fr_100px_1fr] absolute inset-0 m-auto w-full h-full overflow-hidden">
        <div
          className={cn(
            "relative",
            isEditable &&
              activeEl === "header" &&
              "outline outline-sky-500 -outline-offset-4",
          )}
        >
          <EditableContent
            isSelected={selected}
            isEditable={isEditable}
            content={content?.header}
            alignContent="center"
            fontSize={fontSize}
            maxLines={2}
            contentLocation="header"
            relative
            onFocus={() => setActiveEl("header")}
            onBlur={() => setActiveEl(null)}
          />
        </div>
        <div></div>
        <div
          className={cn(
            isEditable &&
              activeEl === "body" &&
              "outline outline-sky-500 -outline-offset-4",
          )}
        >
          <EditableContent
            isSelected={selected}
            isEditable={isEditable}
            content={content?.body}
            alignContent="center"
            fontSize={fontSize}
            className={cn(
              isEditable &&
                activeEl === "body" &&
                "outline outline-sky-500 -outline-offset-4",
            )}
            contentLocation="body"
            relative
            onFocus={() => setActiveEl("body")}
            onBlur={() => setActiveEl(null)}
          />
        </div>
      </div>
    </DEMONodeBase>
  );
};

export default SelfActivationNode;
