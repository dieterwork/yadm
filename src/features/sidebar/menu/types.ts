import type { DEMOObjectType } from "../../DEMO_objects/types";

export interface SidebarMenuItem {
  id: string;
  name: string;
  title: string;
  icon: string;
  sections: SidebarMenuSection[];
}

export interface SidebarMenuSection {
  id: string;
  name: string;
  title: string;
  items: SidebarMenuSectionItem[];
}

export interface SidebarMenuSectionItem {
  id: string;
  name: string;
  title: string;
  type: string;
  icon: string;
}
