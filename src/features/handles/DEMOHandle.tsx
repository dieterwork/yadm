import { Handle, type HandleProps } from "@xyflow/react";
import { useDEMOModeler } from "../modeler/useDEMOModeler";

const DEMOHandle = ({
  id,
  nodeId,
  position,
  ...restProps
}: HandleProps & { nodeId: string }) => {
  const updateNodeHandles = useDEMOModeler((state) => state.updateNodeHandles);
  return (
    <Handle
      {...restProps}
      id={id}
      position={position}
      onContextMenu={(e) => {
        e.preventDefault();
        updateNodeHandles(nodeId, (handles) => ({
          ...handles,
          [position]: {
            ...handles[position],
            handles: handles[position]?.handles?.filter(
              (handle) => handle.id !== id
            ),
          },
        }));
      }}
    />
  );
};

export default DEMOHandle;
