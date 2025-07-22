import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
} from "react-aria-components";

const FileMenu = () => {
  return (
    <MenuTrigger>
      <Button>File</Button>
      <Popover>
        <Menu className="bg-white">
          <MenuItem>New</MenuItem>
          <MenuItem>Save</MenuItem>
          <MenuItem>Import JSON</MenuItem>
          <SubmenuTrigger>
            <MenuItem>Export as</MenuItem>
            <Popover>
              <Menu>
                <MenuItem>JSON</MenuItem>
                <MenuItem>PNG</MenuItem>
                <MenuItem>PDF</MenuItem>
              </Menu>
            </Popover>
          </SubmenuTrigger>
          <MenuItem>Delete diagram</MenuItem>
          <MenuItem>Exit</MenuItem>
        </Menu>
      </Popover>
    </MenuTrigger>
  );
};

export default FileMenu;
