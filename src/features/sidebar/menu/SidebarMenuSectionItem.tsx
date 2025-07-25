import { MenuItem, type MenuItemProps } from "@headlessui/react";
import { type Ref } from "react";
import Shape from "../../shapes/Shape";
import { shapeMap } from "../../shapes/shapeMap";
import { usePreviewNode } from "../usePreviewNode";
import { DEFAULT_CONTENT_MAP, DEFAULT_SIZE_MAP } from "../../nodes/utils";

interface SidebarMenuSectionItemProps extends MenuItemProps {
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
  const DEMOShape = shapeMap[type];
  const { updatePreviewNode, updatePosition } = usePreviewNode();
  if (!DEMOShape) return null;
  return (
    <>
      <MenuItem {...restProps} ref={ref}>
        <button
          className="grid place-items-center shadow-sm gap-2 px-4 py-4 aspect-square cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            updatePreviewNode({ type, content: DEFAULT_CONTENT_MAP[type] });
            updatePosition({ x: e.clientX, y: e.clientY });
          }}
        >
          <Shape
            type={type}
            width={DEFAULT_SIZE_MAP[type]["width"] / 5}
            height={DEFAULT_SIZE_MAP[type]["height"] / 5}
            stroke="black"
            strokeWidth={1.5}
          >
            <DEMOShape />
          </Shape>
          <div className="font-medium text-center text-sm">{title}</div>
        </button>
      </MenuItem>
    </>
  );
};

export default SidebarMenuSectionItem;
