import { useState } from "react";
import { type NodeProps } from "@xyflow/react";
import { cn } from "@sglara/cn";

import type { ActorNode as ActorNodeType } from "./actor.types";
import DEMONodeBase, { type NodeToolbarAction } from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import { getNode } from "$/features/modeler/store/useDEMOModelerStore";

const ActorNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<ActorNodeType>) => {
  const { content, fontSize, isEditable, resizable, actions, state } = data;

  const [activeEl, setActiveEl] = useState<"header" | "body" | null>(null);

  const parent = getNode(parentId);

  const defaultActions: NodeToolbarAction[] = [
    "addHandle",
    "changeColor",
    "changeFontSize",
    "toggleHandlesVisibility",
    "changeFocus",
    "changeState",
    "editText",
  ].concat(parentId ? ["attachNode"] : []);

  console.log(content);

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      resizable={resizable}
      draggable={draggable}
      type="actor"
      actions={actions ?? defaultActions}
      parentId={parentId}
      dragParent
    >
      {parent?.type === "self_activation" ? (
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
          <div />
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
              contentLocation="body"
              relative
              onFocus={() => setActiveEl("body")}
              onBlur={() => setActiveEl(null)}
            />
          </div>
        </div>
      ) : (
        <EditableContent
          isSelected={selected}
          isEditable={isEditable}
          content={content?.body}
          width={width}
          height={height}
          fontSize={fontSize}
          contentLocation="body"
          maxLength={100}
          maxLines={4}
          hidden={state === "unclear"}
        />
      )}
    </DEMONodeBase>
  );
};

export default ActorNode;
