import {
  useDraggableCollection,
  useMenuSection,
  useSeparator,
  type AriaMenuSectionProps,
} from "react-aria";
import {
  useDraggableCollectionState,
  type Node,
  type TreeState,
} from "react-stately";
import { YADM_DATA_TYPE } from "../../drag-and-drop/utils";
import SidebarMenuSectionItem from "./SidebarMenuSectionItem";
import type {
  SidebarMenuItem,
  SidebarMenuSectionItem,
  SidebarMenuSectionItem as SidebarMenuSectionItemType,
  SidebarMenuSection as SidebarMenuSectionType,
} from "./types";
import type { RefObject } from "react";

interface SidebarMenuSectionProps<T> extends AriaMenuSectionProps {
  section: Node<T>;
  state: TreeState<T>;
  ref: RefObject<HTMLUListElement>;
}

const SidebarMenuSection = ({
  section,
  state,
  ref,
  ...restProps
}: SidebarMenuSectionProps<SidebarMenuSectionItemType>) => {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  const { separatorProps } = useSeparator({
    elementType: "li",
  });

  // Setup drag state for the collection.
  const dragState = useDraggableCollectionState({
    // Pass through events from props.
    ...restProps,

    // Collection and selection manager come from list state.
    collection: state.collection,
    selectionManager: state.selectionManager,

    // Provide data for each dragged item. This function could
    // also be provided by the user of the component.
    getItems: (keys) => {
      return [...keys].map((key) => {
        const item = state.collection.getItem(key);
        return {
          [YADM_DATA_TYPE]: item?.value?.type ?? "",
        };
      });
    },
  });

  useDraggableCollection(restProps, dragState, ref);

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          style={{
            borderTop: "1px solid gray",
            margin: "2px 5px",
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span
            {...headingProps}
            style={{
              fontWeight: "bold",
              fontSize: "1.1em",
              padding: "2px 5px",
            }}
          >
            {section.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          ref={ref}
          style={{
            padding: 0,
            listStyle: "none",
          }}
        >
          {[...section.childNodes].map((node) => (
            <SidebarMenuSectionItem
              key={node.key}
              item={node}
              state={state}
              dragState={dragState}
              {...restProps}
            />
          ))}
        </ul>
      </li>
    </>
  );
};

export default SidebarMenuSection;
