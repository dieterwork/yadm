import { Menu, MenuTrigger } from "react-aria-components";
import { useDEMOModeler } from "../../modeler/useDEMOModeler";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuPopover from "../_components/TopbarMenuPopover";
import TopbarMenuItem from "../_components/TopbarMenuItem";

const EditMenu = () => {
  const { undo, redo } = useDEMOModeler.temporal.getState();
  return (
    <TopbarMenuButton label="Edit">
      <TopbarMenuItem onAction={() => undo()}>Undo</TopbarMenuItem>
      <TopbarMenuItem onAction={() => redo()}>Redo</TopbarMenuItem>
    </TopbarMenuButton>
  );
};

export default EditMenu;
