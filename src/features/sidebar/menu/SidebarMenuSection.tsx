import {
  useMenuSection,
  useSeparator,
  type AriaMenuSectionProps,
} from "react-aria";
import SidebarMenuItem from "./SidebarMenuItem";
import type { Node, TreeState } from "react-stately";

interface SidebarMenuSectionProps<T> extends AriaMenuSectionProps {
  section: Node<T>;
  state: TreeState<T>;
}

const SidebarMenuSection = <T extends object>({
  section,
  state,
}: SidebarMenuSectionProps<T>) => {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  const { separatorProps } = useSeparator({
    elementType: "li",
  });

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          className="border border-width-1 border-color-gray-500"
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span {...headingProps} className="mb-4">
            {section.rendered}
          </span>
        )}
        <ul {...groupProps} className="grid grid-cols-2 gap-4">
          {[...section.childNodes].map((node) => (
            <SidebarMenuItem key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
};

export default SidebarMenuSection;
