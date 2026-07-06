import { type NodeProps } from "@xyflow/react";
import { useLayoutEffect, useRef, useState } from "react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { AttributeNode as AttributeNodeType } from "../objectFactDiagram.types";
import { cn } from "@sglara/cn";

const AttributeNode = ({
  id,
  data,
  selected,
  width,
  height,
  draggable,
  parentId,
}: NodeProps<AttributeNodeType>) => {
  const { content, fontSize, isEditable } = data;

  const observerRef = useRef<ResizeObserver | null>(null);
  const [activeEl, setActiveEl] = useState(null);

  const updateHeight: ResizeObserverCallback = (entries) => {
    const entry = entries[0];
    // get height of child
    const height = entry.contentRect.height;

    // then get padding to add to the headerHeight
    const padding = parseFloat(
      getComputedStyle(entry.target.parentElement as HTMLDivElement)
        .paddingBlock,
    );

    setHeaderHeight(height + padding * 2);
  };

  if (observerRef.current === null) {
    observerRef.current = new ResizeObserver(updateHeight);
  }

  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLSpanElement>(null!);
  const bodyRef = useRef<HTMLSpanElement>(null!);

  useLayoutEffect(() => {
    const el = headerRef.current;
    const observer = observerRef.current;

    observer?.observe(el);

    return () => observer?.disconnect();
  }, []);

  return (
    <DEMONodeBase
      id={id}
      data={data}
      selected={selected}
      width={width}
      height={height}
      type="attribute"
      draggable={draggable}
      actions={[
        "addHandle",
        "changeColor",
        "changeFontSize",
        "editText",
        "toggleHandlesVisibility",
        "changeFocus",
        "bringToFront",
        "sendToBack",
      ].concat(parentId ? "attachNode" : [])}
    >
      <div className="grid grid-rows-[auto_1fr] absolute inset-0 m-auto w-full h-full overflow-hidden">
        <div
          className={cn(
            "relative",
            "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[calc(100%-4px)] after:[background:repeating-linear-gradient(90deg,black_0,black_6px,transparent_6px,transparent_9px)]",
            isEditable &&
              activeEl === "header" &&
              "outline outline-sky-500 -outline-offset-4",
          )}
          style={{ height: `max(40px, ${headerHeight}px)` }}
        >
          <EditableContent
            isSelected={selected}
            isEditable={isEditable}
            content={content?.header}
            alignContent="center"
            fontSize={fontSize}
            maxLines={2}
            contentLocation="header"
            ref={headerRef}
            relative
            fitContent
            onFocus={() => setActiveEl("header")}
            onBlur={() => setActiveEl(null)}
          />
        </div>
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
            ref={bodyRef}
            relative
            onFocus={() => setActiveEl("body")}
            onBlur={() => setActiveEl(null)}
          />
        </div>
      </div>
    </DEMONodeBase>
  );
};

export default AttributeNode;
