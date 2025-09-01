import { Handle, Position } from "@xyflow/react";

export const GhostNode = () => (
  <div style={{ width: 10, height: 10 }}>
    <Handle
      className="handle-ghost"
      type="target"
      position={Position.Top}
      isConnectable={false}
      style={{ background: "transparent", border: "none" }}
    />
  </div>
);
