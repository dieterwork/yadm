import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
} from "react-aria-components";

const Topbar = () => {
  return (
    <div className="topbar | [grid-area:topbar]  border-b border-gray-200">
      <div className="topbar-inner | flex">
        <h1>
          <a href="/">YADM</a>
        </h1>
        <nav className="nav">
          <ul className="flex">
            <li>
              <MenuTrigger>
                <Button>File</Button>
                <Popover>
                  <Menu>
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
            </li>
            <li>
              <MenuTrigger>
                <Button>Edit</Button>
                <Popover>
                  <Menu>
                    <MenuItem>Undo</MenuItem>
                    <MenuItem>Redo</MenuItem>
                    <MenuItem>Clear</MenuItem>
                  </Menu>
                </Popover>
              </MenuTrigger>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Topbar;
