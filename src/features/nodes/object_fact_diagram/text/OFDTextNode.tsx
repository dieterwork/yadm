import type { NodeProps } from "@xyflow/react";
import type { DEMONode } from "../../nodes.types";
import { TextField } from "react-aria-components";
import {
  useDEMOModeler,
  type DEMOModelerState,
} from "../../../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";

const OFDTextNode = ({
  id,
  data,
  selected,
  width,
  height,
}: NodeProps<DEMONode<string>>) => {
  const { updateNodeContent } = useDEMOModeler(
    useShallow((state: DEMOModelerState) => ({
      updateNodeContent: state.updateNodeContent,
    }))
  );
  return (
    <div style={{ width, height }} className="relative border-1">
      <input
        className="absolute m-auto inset-0 w-full h-full text-sm text-center"
        type="text"
        onChange={(e) => {
          updateNodeContent(id, e);
        }}
      />
    </div>
  );
};

export default OFDTextNode;
