import { type NodeProps } from "@xyflow/react";
import { useLayoutEffect, useRef, useState } from "react";

import DEMONodeBase from "../../DEMONodeBase";
import EditableContent from "../../../editable_content/EditableContent";
import type { AttributeNode as AttributeNodeType } from "../objectFactDiagram.types";

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

  const [headerHeight, setHeaderHeight] = useState<number | undefined>(
    undefined,
  );
  const headerRef = useRef<HTMLSpanElement>(null!);
  const bodyRef = useRef<HTMLSpanElement>(null!);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const wrapper = el.parentElement;
    if (!wrapper) return;

    const update = () =>
      setHeaderHeight(wrapper.getBoundingClientRect().height);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
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
      ].concat(parentId ? "attachNode" : [])}
    >
      <div className="grid grid-rows-2 absolute inset-0 m-auto w-full h-full overflow-hidden">
        <EditableContent
          isSelected={selected}
          isEditable={isEditable}
          content={content?.header}
          width={width}
          alignContent="center"
          fontSize={fontSize}
          maxLength={60}
          className="bottom-auto after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[calc(100%-4px)] after:border-b after:border-dashed after:border-black
"
          contentLocation="header"
          ref={headerRef}
          fitContent
          relative
        />
        <EditableContent
          isSelected={selected}
          isEditable={isEditable}
          content={content?.body}
          width={width}
          alignContent="center"
          fontSize={fontSize}
          maxLength={60}
          className="top-auto"
          contentLocation="body"
          ref={bodyRef}
          relative
        />
      </div>
    </DEMONodeBase>
  );
};

export default AttributeNode;
