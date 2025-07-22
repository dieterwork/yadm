import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  SubmenuTrigger,
} from "react-aria-components";
import EditMenu from "./menus/EditMenu";
import FileMenu from "./menus/FileMenu";

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
              <FileMenu />
            </li>
            <li>
              <EditMenu />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Topbar;
