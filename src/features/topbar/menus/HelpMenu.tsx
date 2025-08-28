import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";

const HelpMenu = () => {
  return (
    <>
      <MenuTrigger>
        <Button>File</Button>
        <Popover>
          <Menu className="bg-white">
            <MenuItem>Short codes</MenuItem>
            <MenuItem>DEMO Cheat sheet</MenuItem>
            <MenuItem>DEMO Info</MenuItem>
            <MenuItem>About modeller</MenuItem>
            <MenuItem>Exit</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </>
  );
};

export default HelpMenu;
