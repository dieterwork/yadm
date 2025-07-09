import ToolbarItem from "./ToolbarItem";

const Toolbar = () => {
  return (
    <div className="pallette | flex absolute bottom-4 left-0 right-0 mx-auto shadow-md w-fit gap-3 p-2 rounded-lg border border-gray-200 bg-white">
      <ToolbarItem />
      <ToolbarItem />
      <ToolbarItem />
    </div>
  );
};

export default Toolbar;
