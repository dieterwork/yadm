import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";
import type { TopbarMenuProps } from "../topbar.types";

const HelpMenu = () => {
  return (
    <>
      <TopbarMenuButton label="Help">
        <TopbarMenuItem>Short codes</TopbarMenuItem>
        <TopbarMenuItem>DEMO Cheat sheet</TopbarMenuItem>
        <TopbarMenuItem>DEMO Info</TopbarMenuItem>
        <TopbarMenuItem>About modeller</TopbarMenuItem>
        <TopbarMenuItem>Exit</TopbarMenuItem>
      </TopbarMenuButton>
    </>
  );
};

export default HelpMenu;
