import { Collection, Header, Select, type Key } from "react-aria-components";
import SidebarMenuButton from "./SidebarMenuButton";
import type { SidebarMenuItemType } from "../Sidebar";
import SidebarMenu from "./SidebarMenu";
import SidebarMenuSection from "./SidebarMenuSection";
import SidebarMenuSectionItem from "./SidebarMenuSectionItem";
import {
  setPreviewNode,
  usePreviewNodeStore,
} from "$/features/preview_node/usePreviewNodeStore";
import {
  DEFAULT_CONTENT_MAP,
  DEFAULT_SIZE_MAP,
} from "$/features/nodes/utils/consts";
import { useEffect, useId, useState } from "react";
import { useDEMOModelerStore } from "$/features/modeler/useDEMOModelerStore";

const SidebarSelect = ({
  menuItem,
  isDisabled,
}: {
  menuItem: SidebarMenuItemType;
  isDisabled?: boolean;
}) => {
  const previewNode = usePreviewNodeStore((state) => state.previewNode);
  const [isOpen, setOpen] = useState(false);
  const buttonId = useId();
  const isEnabled = useDEMOModelerStore((state) => state.isEnabled);

  const [selected, setSelected] = useState<Key | null>(
    menuItem.sections[0].items[0].id
  );

  useEffect(() => {
    if (previewNode === null) setSelected(null);
  }, [previewNode]);

  return (
    <div className="select-wrapper">
      <Select
        className="outline-hidden"
        aria-labelledby={buttonId}
        selectedKey={selected}
        onSelectionChange={(selected) => {
          setSelected(selected);
        }}
        isDisabled={isDisabled}
      >
        <SidebarMenuButton
          label={menuItem.label}
          id={buttonId}
          isOpen={isOpen}
          onPress={() => setOpen((isOpen) => !isOpen)}
        />
        <SidebarMenu items={menuItem.sections} isOpen={isOpen}>
          {(section) => (
            <SidebarMenuSection key={section.id}>
              <Header className="mb-4 text-xs text-slate-500">
                {section.label}
              </Header>
              <Collection items={section.items}>
                {(item) => (
                  <SidebarMenuSectionItem
                    isDisabled={!isEnabled}
                    id={item.id}
                    onClick={(e) => {
                      if (isDisabled) return;
                      setPreviewNode({
                        type: item.type,
                        width: DEFAULT_SIZE_MAP[item.type]?.width ?? 0,
                        height: DEFAULT_SIZE_MAP[item.type]?.height ?? 0,
                        position: { x: e.clientX, y: e.clientY },
                        content: DEFAULT_CONTENT_MAP[item.type] ?? "",
                      });
                    }}
                    key={item.id}
                    label={item.label}
                    icon={item.icon}
                  />
                )}
              </Collection>
            </SidebarMenuSection>
          )}
        </SidebarMenu>
      </Select>
    </div>
  );
};

export default SidebarSelect;
