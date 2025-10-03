import { Group, type GroupProps } from "react-aria-components";

const DEMOElementToolbarGroup = ({ ...restProps }: GroupProps) => {
  return <Group {...restProps} className="flex flex-col" />;
};

export default DEMOElementToolbarGroup;
