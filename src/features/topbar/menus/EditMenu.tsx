import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import { useDEMOModeler } from "../../modeler/useDEMOModeler";

const EditMenu = () => {
  const { undo, redo, clear } = useDEMOModeler.temporal.getState();
  return (
    <MenuTrigger>
      <Button>Edit</Button>
      <Popover>
        <Menu className="bg-white">
          <MenuItem onAction={() => undo()}>Undo</MenuItem>
          <MenuItem onAction={() => redo()}>Redo</MenuItem>
          <MenuItem onAction={() => clear()}>Clear</MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};

export default EditMenu;
