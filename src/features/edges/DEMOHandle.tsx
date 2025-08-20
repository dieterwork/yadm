import { cn } from "@sglara/cn";
import { Handle, type HandleProps } from "@xyflow/react";

const DEMOHandle = ({ ...restProps }: HandleProps) => {
  return (
    <Handle
      className={cn(
        "demo-handle | w-[10px]! h-[10px]! bg-blue-500!",
        restProps.className
      )}
      {...restProps}
    />
  );
};

export default DEMOHandle;
