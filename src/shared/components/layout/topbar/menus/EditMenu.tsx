import {
  clearModel,
  useDEMOModelerStore,
} from "$/features/modeler/useDEMOModelerStore";
import TopbarMenuButton from "../_components/TopbarMenuButton";
import TopbarMenuItem from "../_components/TopbarMenuItem";

const EditMenu = () => {
  const { undo, redo } = useDEMOModelerStore.temporal.getState();
  return (
    <TopbarMenuButton label="Edit">
      <TopbarMenuItem onAction={() => undo()}>Undo</TopbarMenuItem>
      <TopbarMenuItem onAction={() => redo()}>Redo</TopbarMenuItem>
      <TopbarMenuItem onAction={() => clearModel()}>Clear</TopbarMenuItem>
      <TopbarMenuItem>Exit</TopbarMenuItem>
    </TopbarMenuButton>
  );
};

export default EditMenu;
