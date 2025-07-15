import { MenuItem, type MenuItemProps } from "@headlessui/react";
import { useRef, type DragEvent, type RefObject } from "react";
import { YADM_DATA_TYPE } from "../../drag-and-drop/utils";
import DEMOObject from "../../DEMO_objects/DEMOObject";
import { DragPreview, useDrag, type DragPreviewRenderer } from "react-aria";

interface SidebarMenuSectionItemProps extends MenuItemProps {
  title: string;
  icon?: string;
  type: string;
  ref?: RefObject<HTMLElement>;
}

const SidebarMenuSectionItem = ({
  title,
  icon,
  type,
  ref,
  ...restProps
}: SidebarMenuSectionItemProps) => {
  ref = ref ? ref : useRef<HTMLElement>(null!);
  const dragPreviewRef = useRef<DragPreviewRenderer | null>(null);

  const { dragProps } = useDrag({
    preview: dragPreviewRef,
    getItems() {
      return [
        {
          [YADM_DATA_TYPE]: type,
        },
      ];
    },
  });

  return (
    <>
      <div {...restProps} ref={ref}>
        <div
          className="grid place-items-center shadow-sm gap-2 px-4 py-4 aspect-square"
          {...dragProps}
          onClick={(e) => e.preventDefault()}
        >
          <DEMOObject
            type={type}
            width={40}
            height={40}
            fill="white"
            stroke="black"
            strokeWidth={2}
          />
          <div className="font-medium text-center text-sm">{title}</div>{" "}
          <DragPreview ref={dragPreviewRef}>
            {(items) => (
              <DEMOObject
                type={items[0][YADM_DATA_TYPE]}
                width={40}
                height={40}
                fill="white"
                stroke="black"
                strokeWidth={2}
              />
            )}
          </DragPreview>
        </div>
      </div>
    </>
  );
};

export default SidebarMenuSectionItem;
