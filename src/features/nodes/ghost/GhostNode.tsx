import { Handle, Position } from "@xyflow/react";

export const GhostNode = () => (
  <div style={{ width: 5, height: 5 }}>
    <Handle
      type="target"
      position={Position.Top}
      isConnectable={false}
      style={{ background: "white" }}
    />
  </div>
);
