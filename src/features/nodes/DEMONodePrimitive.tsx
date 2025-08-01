import {
  Handle,
  NodeResizer,
  Position,
  useNodeId,
  type NodeProps,
} from "@xyflow/react";
import { shapeMap } from "../shapes/shapeMap";
import Shape from "../shapes/Shape";
import { useRef, type ReactNode } from "react";
import NodeToolbar from "../node-toolbar/NodeToolbar";
import { useDEMOModeler } from "../modeler/useDEMOModeler";
import { useShallow } from "zustand/react/shallow";

const handlePositions = [
  Position.Top,
  Position.Right,
  Position.Bottom,
  Position.Left,
];

interface DEMONodePrimitiveProps<T> extends NodeProps<ActorNode<T>> {
  resizable?: boolean;
  keepAspectRatio?: boolean;
  children: ReactNode;
}

const DEMONodePrimitive = <T extends string>({
  id,
  data,
  selected,
  width,
  height,
  type,
  resizable = true,
  keepAspectRatio = false,
  children,
}: DEMONodePrimitiveProps<T>) => {
  const DEMOShape = shapeMap[type];

  const shapeRef = useRef<SVGSVGElement>(null!);

  const { getNode, getChildrenNodes, updateNodeExtent } = useDEMOModeler(
    useShallow((state) => ({
      getNode: state.getNode,
      getChildrenNodes: state.getChildrenNodes,
      updateNodeExtent: state.updateNodeExtent,
    }))
  );

  const changeChildExtent = () => {
    const parentNode = getNode(id);
    const childrenNodes = getChildrenNodes(id);

    for (const child of childrenNodes) {
      if (!child || !child?.extent || child?.extent === "parent") return;
      updateNodeExtent(child.id, [
        [12.5, 12.5],
        [parentNode.width - 12.5, parentNode.height - 12.5],
      ]);
    }
  };

  return (
    <div>
      {/* Controls */}
      <NodeToolbar id={id} data={data} type={type} />
      {resizable && (
        <NodeResizer
          keepAspectRatio={keepAspectRatio}
          isVisible={selected}
          onResize={changeChildExtent}
        />
      )}
      {/* {handlePositions.map((position) => (
        <Handle
          id={position}
          type="source"
          position={position}
          key={position}
        />
      ))} */}
      {/* Shape */}
      {DEMOShape && (
        <Shape ref={shapeRef} width={width} height={height} strokeWidth={2}>
          <DEMOShape
            state={data?.state}
            scope={data?.scope}
            color={data?.color}
          />
        </Shape>
      )}
      {/* Children Content */}
      {children}
    </div>
  );
};

export default DEMONodePrimitive;
