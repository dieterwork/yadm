import { Handle, Position } from "@xyflow/react";

const GhostNode = ({ data }) => (
  <div style={{ width: 1, height: 1 }}>
    <Handle
      className="ghost-handle"
      type="target"
      position={data.handlePosition ?? Position.Top}
      isConnectable={false}
    />
  </div>
);

export default GhostNode;
