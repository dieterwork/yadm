import { useEffect, type Ref } from "react";
import Shape from "../../shapes/Shape";
import { shapeMap } from "../../shapes/shapeMap";
import { usePreviewNodeStore } from "../usePreviewNodeStore";
import {
  DEFAULT_CONTENT_MAP,
  DEFAULT_SIZE_MAP,
} from "../../nodes/utils/consts";
import { MenuItem } from "react-aria-components";
import type { AriaMenuItemProps } from "react-aria";
import { useShallow } from "zustand/react/shallow";

interface SidebarMenuSectionItemProps extends AriaMenuItemProps {
  title: string;
  icon?: string;
  type: string;
  ref?: Ref<HTMLDivElement>;
}

const SidebarMenuSectionItem = ({
  title,
  icon,
  type,
  ref,
  ...restProps
}: SidebarMenuSectionItemProps) => {
  const DEMOShape = shapeMap[icon];
  const { createPreviewNode, updatePreviewNodePosition } = usePreviewNodeStore(
    useShallow((state) => ({
      createPreviewNode: state.createNode,
      updatePreviewNodeType: state.updateType,
      updatePreviewNodeContent: state.updateContent,
      updatePreviewNodePosition: state.updatePosition,
      previewNode: state.previewNode,
    }))
  );
  if (!DEMOShape) return null;

  return (
    <>
      <MenuItem
        {...restProps}
        className="grid place-items-center shadow-sm gap-1 px-4 py-4 aspect-square cursor-pointer overflow-hidden"
        onClick={(e) => {
          createPreviewNode({
            type,
            width: 100,
            height: 100,
            position: { x: e.clientX, y: e.clientY },
            content: DEFAULT_CONTENT_MAP[type],
          });
        }}
        onHoverStart={(e) => {}}
        ref={ref}
      >
        {/* <Shape
          type={type}
          width={DEFAULT_SIZE_MAP[type].width / 2}
          height={DEFAULT_SIZE_MAP[type].height / 2}
          stroke="black"
          strokeWidth={1.5}
        >
          <DEMOShape />
        </Shape> */}
        <div className="font-medium text-center text-sm">{title}</div>
      </MenuItem>
    </>
  );
};

export default SidebarMenuSectionItem;
