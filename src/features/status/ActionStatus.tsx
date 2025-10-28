import {
  useDEMOModelerStore,
  type ModelerAction,
} from "../modeler/useDEMOModelerStore";

const getActionLabel = (action: ModelerAction) => {
  switch (action) {
    case "attach":
      return "Attach node";
    case "edit":
      return "Edit text";
    case "pan":
      return "Pan";
    case "preview":
      return "Insert node";
    case "select":
      return "Select";
    default:
      throw new Error("Invalid Action");
  }
};
const ActionStatus = () => {
  const action = useDEMOModelerStore((state) => state.action);
  const actionLabel = getActionLabel(action);

  return <div className="action-status">
    
  </div>
};

export default ActionStatus;
