import { clearModel, useDEMOModeler } from "../../modeler/useDEMOModeler";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";

const EditMenu = () => {
  const { undo, redo } = useDEMOModeler.temporal.getState();
  return (
    <TopbarMenuButton label="Edit">
      <TopbarMenuItem onAction={() => undo()}>Undo</TopbarMenuItem>
      <TopbarMenuItem onAction={() => redo()}>Redo</TopbarMenuItem>
      <TopbarMenuItem onAction={() => clearModel()}>Clear</TopbarMenuItem>
    </TopbarMenuButton>
  );
};

export default EditMenu;
